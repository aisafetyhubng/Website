# Renders the 1200x630 share preview image (shown when the site is shared on WhatsApp, LinkedIn, X).
# After a rename, run it again with the new name, for example:
#   .\make-og-image.ps1 -Out ..\public\og-image.png -Name 'New Name'
param(
  [Parameter(Mandatory)][string]$Out,
  [string]$Name = 'AI Safety Hub Nigeria',
  [string]$Headline = 'Helping Nigerians find their way into AI safety',
  [string]$Tagline = 'Fellowships, reading groups and events in AI safety research, governance and policy.',
  [string]$Mark = (Join-Path $PSScriptRoot '..\public\img\logo-mark-white.png')
)
Add-Type -AssemblyName PresentationCore, PresentationFramework, WindowsBase

$W = 1200; $H = 630
$dv = New-Object Windows.Media.DrawingVisual
$dc = $dv.RenderOpen()
$bc = New-Object Windows.Media.BrushConverter
$dc.DrawRectangle($bc.ConvertFromString('#063A41'), $null, (New-Object Windows.Rect 0, 0, $W, $H))

# pixel-row texture on the right, echoing the site's hero
$rand = New-Object Random 7
$shades = '#05343B','#0B7F8C','#2FB7C4','#9ED9DC' | ForEach-Object { $bc.ConvertFromString($_) }
for ($y = 0; $y -lt $H; $y += 10) {
  $x = 640
  while ($x -lt $W) {
    $seg = 10 + $rand.Next(0, 90)
    $t = [Math]::Min(3, [Math]::Max(0, [int](1.5 + 1.4 * [Math]::Sin($x / 160.0 + $y / 120.0) + ($rand.NextDouble() - 0.5))))
    $alpha = [Math]::Min(1.0, ($x - 640) / 300.0)
    $dc.PushOpacity($alpha)
    $dc.DrawRectangle($shades[$t], $null, (New-Object Windows.Rect $x, $y, ($seg + 1), 11))
    $dc.Pop()
    $x += $seg
  }
}

function Draw-Text($text, $size, $color, $x, $y, $family, $style = 'Normal', $weight = 'Normal') {
  $tf = New-Object Windows.Media.Typeface (New-Object Windows.Media.FontFamily $family), ([Windows.FontStyles]::$style), ([Windows.FontWeights]::$weight), ([Windows.FontStretches]::Normal)
  $ft = New-Object Windows.Media.FormattedText $text, ([Globalization.CultureInfo]::InvariantCulture), ([Windows.FlowDirection]::LeftToRight), $tf, $size, ($bc.ConvertFromString($color)), 1.0
  $ft.MaxTextWidth = $(if ($size -gt 40) { 520 } else { 560 })
  $dc.DrawText($ft, (New-Object Windows.Point $x, $y))
}

$textX = 80
if (Test-Path $Mark) {
  $img = New-Object Windows.Media.Imaging.BitmapImage
  $img.BeginInit(); $img.UriSource = New-Object Uri ((Resolve-Path $Mark).Path); $img.CacheOption = 'OnLoad'; $img.EndInit()
  $dc.DrawImage($img, (New-Object Windows.Rect 80, 80, 48, 48))
  $textX = 140
}
Draw-Text $Name.ToUpper() 22 '#7FD3DA' $textX 91 'Segoe UI' 'Normal' 'SemiBold'
Draw-Text $Headline 60 '#FFFFFF' 80 165 'Georgia'
Draw-Text $Tagline 24 '#BFDDDF' 80 470 'Segoe UI'
$dc.Close()

$bmp = New-Object Windows.Media.Imaging.RenderTargetBitmap $W, $H, 96, 96, ([Windows.Media.PixelFormats]::Pbgra32)
$bmp.Render($dv)
$enc = New-Object Windows.Media.Imaging.PngBitmapEncoder
$enc.Frames.Add([Windows.Media.Imaging.BitmapFrame]::Create($bmp))
$fs = [IO.File]::Create($Out); $enc.Save($fs); $fs.Close()
"Saved $Out"
