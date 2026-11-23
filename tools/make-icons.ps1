# Builds the site's logo mark and icon files from the logo image (teal mark on white).
# Output: transparent marks (teal + white) for the header/footer, favicons, app icons and a schema logo.
param([string]$Src, [string]$Dst)
Add-Type -AssemblyName System.Drawing

$srcImg = [System.Drawing.Bitmap]::FromFile($Src)
# Square crop around the mark (excludes the start of the wordmark on the right edge).
$crop = New-Object System.Drawing.Rectangle 24, 50, 362, 362
$mark = $srcImg.Clone($crop, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$srcImg.Dispose()

# Find the mark's own teal: average of strongly coloured pixels.
$sum = @(0, 0, 0); $n = 0
for ($y = 0; $y -lt $mark.Height; $y += 2) { for ($x = 0; $x -lt $mark.Width; $x += 2) {
  $p = $mark.GetPixel($x, $y); if ($p.R -lt 80) { $sum[0] += $p.R; $sum[1] += $p.G; $sum[2] += $p.B; $n++ } } }
$teal = [System.Drawing.Color]::FromArgb([int]($sum[0] / $n), [int]($sum[1] / $n), [int]($sum[2] / $n))
"Logo teal: #{0:X2}{1:X2}{2:X2}" -f $teal.R, $teal.G, $teal.B

# Turn the white background transparent: opacity follows how far the red channel is from white.
function New-Mark($colour) {
  $out = New-Object System.Drawing.Bitmap $mark.Width, $mark.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  for ($y = 0; $y -lt $mark.Height; $y++) { for ($x = 0; $x -lt $mark.Width; $x++) {
    $p = $mark.GetPixel($x, $y)
    $a = [Math]::Max(0, [Math]::Min(255, [int]((255 - $p.R) * 255 / (255 - $teal.R))))
    if ($a -lt 18) { $a = 0 }
    $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, $colour.R, $colour.G, $colour.B)) } }
  return $out
}
$tealMark = New-Mark $teal
$whiteMark = New-Mark ([System.Drawing.Color]::White)

function Save-Scaled($bmp, $size, $path, $bg, $pad) {
  $canvas = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  if ($bg) { $g.Clear($bg) } else { $g.Clear([System.Drawing.Color]::Transparent) }
  $inner = [int]($size * (1 - 2 * $pad)); $off = [int](($size - $inner) / 2)
  $g.DrawImage($bmp, $off, $off, $inner, $inner); $g.Dispose()
  $canvas.Save($path, [System.Drawing.Imaging.ImageFormat]::Png); $canvas.Dispose()
}

New-Item -ItemType Directory -Force (Join-Path $Dst 'img') | Out-Null
Save-Scaled $tealMark 240 (Join-Path $Dst 'img/logo-mark.png') $null 0
Save-Scaled $whiteMark 240 (Join-Path $Dst 'img/logo-mark-white.png') $null 0
$white = [System.Drawing.Color]::White
Save-Scaled $tealMark 512 (Join-Path $Dst 'logo.png') $white 0.08
Save-Scaled $tealMark 512 (Join-Path $Dst 'icon-512.png') $white 0.1
Save-Scaled $tealMark 192 (Join-Path $Dst 'icon-192.png') $white 0.1
Save-Scaled $tealMark 180 (Join-Path $Dst 'apple-touch-icon.png') $white 0.1
Save-Scaled $tealMark 96 (Join-Path $Dst 'favicon-96x96.png') $white 0.06
Save-Scaled $tealMark 48 (Join-Path $Dst 'favicon-48x48.png') $white 0.04

# favicon.ico with 16, 32 and 48 px images (PNG-compressed entries).
$sizes = 16, 32, 48; $pngs = @()
foreach ($s in $sizes) { $tmp = [IO.Path]::GetTempFileName(); Save-Scaled $tealMark $s $tmp $white 0.02; $pngs += , [IO.File]::ReadAllBytes($tmp); Remove-Item $tmp }
$ms = New-Object IO.MemoryStream; $w = New-Object IO.BinaryWriter $ms
$w.Write([uint16]0); $w.Write([uint16]1); $w.Write([uint16]$sizes.Count)
$offset = 6 + 16 * $sizes.Count
for ($i = 0; $i -lt $sizes.Count; $i++) {
  $w.Write([byte]$sizes[$i]); $w.Write([byte]$sizes[$i]); $w.Write([byte]0); $w.Write([byte]0)
  $w.Write([uint16]1); $w.Write([uint16]32); $w.Write([uint32]$pngs[$i].Length); $w.Write([uint32]$offset); $offset += $pngs[$i].Length }
foreach ($p in $pngs) { $w.Write($p) }
[IO.File]::WriteAllBytes((Join-Path $Dst 'favicon.ico'), $ms.ToArray())

$tealMark.Dispose(); $whiteMark.Dispose(); $mark.Dispose()
Get-ChildItem $Dst -File | Where-Object Name -match 'favicon|icon|logo' | Select-Object Name, Length | Format-Table -AutoSize | Out-String
