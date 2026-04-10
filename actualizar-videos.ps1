$videoFolder = Join-Path $PSScriptRoot "videos"
$catalogPath = Join-Path $videoFolder "catalogo.js"
$allowedExtensions = @(".mp4", ".webm", ".ogg", ".mov", ".m4v")

if (-not (Test-Path $videoFolder)) {
    New-Item -ItemType Directory -Path $videoFolder | Out-Null
}

$videos = Get-ChildItem -Path $videoFolder -File |
    Where-Object { $allowedExtensions -contains $_.Extension.ToLower() } |
    Sort-Object Name |
    ForEach-Object {
        [PSCustomObject]@{
            title = [System.IO.Path]::GetFileNameWithoutExtension($_.Name).Replace("-", " ").Replace("_", " ")
            file = $_.Name
            description = "Un momento especial para volver a verlo contigo."
        }
    }

$json = if (@($videos).Count -eq 0) { "[]" } else { @($videos) | ConvertTo-Json }
$content = "window.CARTA_VIDEOS = $json;"
$content | Set-Content -Path $catalogPath -Encoding UTF8

Write-Host "Catalogo actualizado en $catalogPath"
