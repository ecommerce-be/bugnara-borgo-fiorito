# ===============================================================
# load-env.ps1
# Loads the .env file from project root into the current PowerShell
# session as environment variables. Run BEFORE `mvn spring-boot:run`.
#
# Usage:
#   cd C:\borghetto-fiorito
#   .\load-env.ps1
#   cd backend ; mvn spring-boot:run
# ===============================================================

$envFile = Join-Path $PSScriptRoot ".env"

if (-not (Test-Path $envFile)) {
    Write-Host ".env not found at $envFile" -ForegroundColor Red
    Write-Host "Copy .env.example to .env and fill it with real values." -ForegroundColor Yellow
    return
}

$loaded = 0
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith("#")) {
        if ($line -match '^\s*([^=]+?)\s*=\s*(.*)\s*$') {
            $name = $matches[1]
            $value = $matches[2]
            # Strip surrounding quotes if present
            if ($value -match '^"(.*)"$') { $value = $matches[1] }
            elseif ($value -match "^'(.*)'$") { $value = $matches[1] }
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
            $loaded++
        }
    }
}

Write-Host ""
Write-Host ".env loaded ($loaded variables)" -ForegroundColor Green
Write-Host "Profile: $env:SPRING_PROFILES_ACTIVE"
Write-Host ""