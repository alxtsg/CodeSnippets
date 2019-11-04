#!/usr/bin/env pwsh
#
# Batch convert images from HEIC to JPEG format.
# Author: Alex TSANG <alextsang@live.com>
# License: The 3-Clause BSD License

[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [String]$Directory
)

$IMPath = 'C:\Users\alex\Downloads\ImageMagick-7.0.9-2-portable-Q16-x64\'
$ConvertCommand = Join-Path -Path $IMPath -ChildPath 'convert.exe'

if ((Get-Command $ConvertCommand -ErrorAction SilentlyContinue) -eq $null) {
  Write-Host 'ImageMagick not found.'
  Exit
}

if ( -not (Test-Path $Directory -PathType Container) ) {
  Write-Host 'Invalid directory path.'
  Exit
}

$ConvertedDirectory = Join-Path -Path $Directory -ChildPath 'Converted'
New-Item -Type Directory $ConvertedDirectory | Out-Null

Get-ChildItem -File $Directory | ForEach-Object {
  $HEICFile = Join-Path -Path $Directory -ChildPath $_.Name
  $JPEGFile = $_.BaseName + '.jpeg'
  $JPEGFilePath = Join-Path -Path $ConvertedDirectory -ChildPath $JPEGFile
  & $ConvertCommand $HEICFile `
    -auto-orient `
    $JPEGFilePath
}
