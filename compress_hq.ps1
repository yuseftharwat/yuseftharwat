$ffmpegPath = "C:\Users\youss\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
$outDir = "C:\Users\youss\OneDrive\Desktop\portfolio-website\portfolio-website\public\projects"
$srcDir = "C:\Users\youss\OneDrive\Desktop\site"

$map = @{
    "new musuem.mp4" = "egyptian-statue\video.mp4"
    "Mani 3 products.mp4" = "manilotti-collection\hero.mp4"
    "shoe.mp4" = "adidas\hero.mp4"
    "RUG.mp4" = "memorug\hero.mp4"
    "Pillows 1.mp4" = "float\hero.mp4"
    "FUR.mp4" = "arinture\hero.mp4"
    "Manilotti Stand Cooker .mp4" = "manilotti\hero.mp4"
    "ritzi.mp4" = "ritzy-facade\hero.mp4"
    "speaker.mp4" = "bang-olufsen\hero.mp4"
    "nike shoe.mp4" = "nike-shoe\video1.mp4"
    "nike shoe vfx 2.mp4" = "nike-shoe\video3.mp4"
    "nike shoe vfx 1.mp4" = "nike-shoe\video2.mp4"
    "final0001-1054.mp4" = "audi-rs5\video.mp4"
}

foreach ($key in $map.Keys) {
    $src = Join-Path $srcDir $key
    $dest = Join-Path $outDir $map[$key]
    
    if (Test-Path $src) {
        Write-Host "Compressing $key to $($map[$key])..."
        & $ffmpegPath -i $src -vf "scale=-2:720" -c:v libx264 -crf 26 -preset fast -an -y $dest
    } else {
        Write-Host "Source file not found: $src" -ForegroundColor Red
    }
}
Write-Host "All done!"
