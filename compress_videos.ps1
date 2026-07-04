$ffmpegPath = "C:\Users\youss\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
$projectsDir = "C:\Users\youss\OneDrive\Desktop\portfolio-website\portfolio-website\public\projects"

$files = Get-ChildItem -Path $projectsDir -Filter "*.mp4" -Recurse
foreach ($file in $files) {
    Write-Host "Compressing $($file.Name)..."
    $outFile = $file.FullName.Replace(".mp4", "_compressed.mp4")
    
    # Run ffmpeg (scale height to 480px, keep aspect ratio, remove audio, crf 32, veryfast)
    & $ffmpegPath -i $file.FullName -vf "scale=-2:480" -c:v libx264 -crf 32 -preset veryfast -an -y $outFile
    
    if (Test-Path $outFile) {
        # Check size comparison
        $origSize = (Get-Item $file.FullName).Length
        $newSize = (Get-Item $outFile).Length
        Write-Host "Original: $([math]::Round($origSize/1MB,2))MB -> New: $([math]::Round($newSize/1MB,2))MB"
        
        # Replace original file
        Move-Item -Path $outFile -Destination $file.FullName -Force
    }
}
Write-Host "All done!"
