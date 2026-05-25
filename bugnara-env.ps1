# ===============================================================
# Bugnara Borgo Fiorito - Local dev environment script
# ===============================================================
# Sets Java 21 for the current PowerShell session ONLY.
# Use this if your system default Java is a different version
# (e.g. Java 25), to avoid changing global JAVA_HOME.
#
# Usage:
#   cd C:\path\to\borghetto-fiorito
#   .\bugnara-env.ps1
#
# When you close this terminal, your system Java is back.
# ===============================================================

# Common JDK 21 install paths on Windows. We try each until one works.
$candidates = @(
    "C:\Program Files\Java\jdk-21",
    "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-21.0.4.7-hotspot",
    "C:\Program Files\Microsoft\jdk-21.0.4.7-hotspot",
    "C:\Program Files\Amazon Corretto\jdk21",
    "C:\Program Files\BellSoft\LibericaJDK-21"
)

$jdk21 = $null
foreach ($c in $candidates) {
    if (Test-Path $c) { $jdk21 = $c; break }
}

# Fallback: scan Program Files for any folder starting with "jdk-21"
if (-not $jdk21) {
    $found = Get-ChildItem "C:\Program Files" -Recurse -Directory -ErrorAction SilentlyContinue `
             -Filter "jdk-21*" -Depth 2 | Select-Object -First 1
    if ($found) { $jdk21 = $found.FullName }
}

if (-not $jdk21) {
    Write-Host ""
    Write-Host "Java 21 non trovata sul sistema." -ForegroundColor Red
    Write-Host "Installa Adoptium Temurin 21 da: https://adoptium.net/temurin/releases/?version=21" -ForegroundColor Yellow
    Write-Host ""
    return
}

$env:JAVA_HOME = $jdk21
$env:Path = "$jdk21\bin;$env:Path"

Write-Host ""
Write-Host "Ambiente Bugnara attivo" -ForegroundColor Green
Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Cyan
java -version
Write-Host ""