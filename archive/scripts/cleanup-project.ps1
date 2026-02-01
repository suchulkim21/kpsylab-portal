# 프로젝트 정리 스크립트
# Phase 1과 Phase 2 항목들을 자동으로 정리합니다.

param(
    [switch]$Phase1,
    [switch]$Phase2,
    [switch]$All,
    [switch]$DryRun
)

$ErrorActionPreference = "Continue"

Write-Host "=== 프로젝트 정리 스크립트 ===" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "[DRY RUN 모드] 실제 삭제는 수행하지 않습니다." -ForegroundColor Yellow
    Write-Host ""
}

# Phase 1: .next 폴더 및 빌드 캐시
if ($Phase1 -or $All) {
    Write-Host "Phase 1: .next 폴더 및 빌드 캐시 정리" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor Green
    
    # .next 폴더 찾기
    $nextDirs = Get-ChildItem -Path . -Recurse -Directory -Filter ".next" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }
    
    foreach ($dir in $nextDirs) {
        $size = (Get-ChildItem $dir.FullName -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1GB
        Write-Host "  발견: $($dir.FullName.Replace((Get-Location).Path + '\', '')) ($([math]::Round($size, 2)) GB)" -ForegroundColor Yellow
        
        if (-not $DryRun) {
            try {
                Remove-Item $dir.FullName -Recurse -Force -ErrorAction Stop
                Write-Host "    ✓ 삭제 완료" -ForegroundColor Green
            } catch {
                Write-Host "    ✗ 삭제 실패: $_" -ForegroundColor Red
            }
        }
    }
    
    # *.tsbuildinfo 파일 찾기
    $tsbuildFiles = Get-ChildItem -Path . -Recurse -Filter "*.tsbuildinfo" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }
    
    foreach ($file in $tsbuildFiles) {
        Write-Host "  발견: $($file.FullName.Replace((Get-Location).Path + '\', ''))" -ForegroundColor Yellow
        
        if (-not $DryRun) {
            try {
                Remove-Item $file.FullName -Force -ErrorAction Stop
                Write-Host "    ✓ 삭제 완료" -ForegroundColor Green
            } catch {
                Write-Host "    ✗ 삭제 실패: $_" -ForegroundColor Red
            }
        }
    }
    
    Write-Host ""
}

# Phase 2: node_modules 폴더 (신중히)
if ($Phase2 -or $All) {
    Write-Host "Phase 2: node_modules 폴더 정리" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor Green
    Write-Host "⚠️  주의: 서버가 실행 중이면 먼저 중지하세요!" -ForegroundColor Yellow
    Write-Host ""
    
    # 실행 중인 Node.js 프로세스 확인
    $nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Write-Host "⚠️  실행 중인 Node.js 프로세스 발견:" -ForegroundColor Red
        $nodeProcesses | ForEach-Object { Write-Host "    PID: $($_.Id), 경로: $($_.Path)" -ForegroundColor Yellow }
        Write-Host ""
        
        if (-not $DryRun) {
            $response = Read-Host "계속하려면 Y를 입력하세요 (프로세스가 자동으로 중지됩니다)"
            if ($response -ne "Y") {
                Write-Host "작업이 취소되었습니다." -ForegroundColor Yellow
                exit
            }
            
            Write-Host "Node.js 프로세스 중지 중..." -ForegroundColor Yellow
            $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
            Write-Host "✓ 프로세스 중지 완료" -ForegroundColor Green
            Write-Host ""
        }
    }
    
    # node_modules 폴더 찾기
    $nodeModulesDirs = Get-ChildItem -Path . -Recurse -Directory -Filter "node_modules" -ErrorAction SilentlyContinue
    
    foreach ($dir in $nodeModulesDirs) {
        $size = (Get-ChildItem $dir.FullName -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1GB
        Write-Host "  발견: $($dir.FullName.Replace((Get-Location).Path + '\', '')) ($([math]::Round($size, 2)) GB)" -ForegroundColor Yellow
        
        if (-not $DryRun) {
            try {
                Remove-Item $dir.FullName -Recurse -Force -ErrorAction Stop
                Write-Host "    ✓ 삭제 완료" -ForegroundColor Green
            } catch {
                Write-Host "    ✗ 삭제 실패: $_" -ForegroundColor Red
            }
        }
    }
    
    Write-Host ""
}

# 최종 용량 확인
if (-not $DryRun) {
    Write-Host "=== 정리 완료 ===" -ForegroundColor Cyan
    $finalSize = (Get-ChildItem -Path . -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1GB
    Write-Host "현재 프로젝트 총 용량: $([math]::Round($finalSize, 2)) GB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 의존성을 재설치하려면 각 프로젝트에서 'npm install'을 실행하세요." -ForegroundColor Yellow
} else {
    Write-Host "=== DRY RUN 완료 ===" -ForegroundColor Cyan
}

