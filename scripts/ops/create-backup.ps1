param(
  [string]$Prefix = "toptik-full-backup"
)

$ErrorActionPreference = "Stop"

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$bundleName = "$Prefix-$timestamp.bundle"
$bundlePath = Join-Path (Get-Location) $bundleName

Write-Host "Creating bundle: $bundlePath"
git bundle create "$bundlePath" --all

Write-Host "Verifying bundle..."
git bundle verify "$bundlePath"

$hash = Get-FileHash -Path "$bundlePath" -Algorithm SHA256
Write-Host "SHA256: $($hash.Hash)"
