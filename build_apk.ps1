Write-Host "--- Debug: build_apk.ps1 internal start ---"

# Set JAVA_HOME to the Android Studio bundled JBR
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH

# Set ANDROID_HOME for Gradle
$env:ANDROID_HOME = "C:\Users\Nastya\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME

Write-Host "Starting MyCoins build process..."

# 1. Build React/Vite project
Write-Host "Building web assets..."
cmd /c "npm run build"

# 2. Sync Capacitor
Write-Host "Syncing Capacitor project..."
cmd /c "npx cap sync"

# 3. Build APK using Gradle
Write-Host "Compiling APK (Gradle)..."
Push-Location android
.\gradlew.bat assembleDebug
Pop-Location

# 4. Move final APK to root
Write-Host "Finalizing..."
$apkPath = "android/app/build/outputs/apk/debug/app-debug.apk"
$outName = "MyCoins_Final.apk"
if (Test-Path $apkPath) {
    Copy-Item $apkPath $outName -Force
    Write-Host "Build Successful! APK saved as $outName"
} else {
    Write-Host "Error: APK not found at $apkPath"
}
