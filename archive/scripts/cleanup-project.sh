#!/bin/bash
# 프로젝트 정리 스크립트 (Linux/Mac용)
# Phase 1과 Phase 2 항목들을 자동으로 정리합니다.

PHASE1=false
PHASE2=false
ALL=false
DRY_RUN=false

# 파라미터 파싱
while [[ $# -gt 0 ]]; do
    case $1 in
        --phase1)
            PHASE1=true
            shift
            ;;
        --phase2)
            PHASE2=true
            shift
            ;;
        --all)
            ALL=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        *)
            echo "알 수 없는 옵션: $1"
            echo "사용법: $0 [--phase1] [--phase2] [--all] [--dry-run]"
            exit 1
            ;;
    esac
done

echo "=== 프로젝트 정리 스크립트 ==="
echo ""

if [ "$DRY_RUN" = true ]; then
    echo "[DRY RUN 모드] 실제 삭제는 수행하지 않습니다."
    echo ""
fi

# Phase 1: .next 폴더 및 빌드 캐시
if [ "$PHASE1" = true ] || [ "$ALL" = true ]; then
    echo "Phase 1: .next 폴더 및 빌드 캐시 정리"
    echo "----------------------------------------"
    
    # .next 폴더 찾기
    find . -type d -name ".next" -not -path "*/node_modules/*" | while read -r dir; do
        size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        echo "  발견: $dir ($size)"
        
        if [ "$DRY_RUN" != true ]; then
            rm -rf "$dir"
            echo "    ✓ 삭제 완료"
        fi
    done
    
    # *.tsbuildinfo 파일 찾기
    find . -type f -name "*.tsbuildinfo" -not -path "*/node_modules/*" | while read -r file; do
        echo "  발견: $file"
        
        if [ "$DRY_RUN" != true ]; then
            rm -f "$file"
            echo "    ✓ 삭제 완료"
        fi
    done
    
    echo ""
fi

# Phase 2: node_modules 폴더 (신중히)
if [ "$PHASE2" = true ] || [ "$ALL" = true ]; then
    echo "Phase 2: node_modules 폴더 정리"
    echo "----------------------------------------"
    echo "⚠️  주의: 서버가 실행 중이면 먼저 중지하세요!"
    echo ""
    
    # 실행 중인 Node.js 프로세스 확인
    if pgrep -x node > /dev/null; then
        echo "⚠️  실행 중인 Node.js 프로세스 발견:"
        pgrep -x node | while read -r pid; do
            echo "    PID: $pid"
        done
        echo ""
        
        if [ "$DRY_RUN" != true ]; then
            read -p "계속하려면 Y를 입력하세요 (프로세스가 자동으로 중지됩니다): " response
            if [ "$response" != "Y" ]; then
                echo "작업이 취소되었습니다."
                exit 0
            fi
            
            echo "Node.js 프로세스 중지 중..."
            pkill -x node
            sleep 2
            echo "✓ 프로세스 중지 완료"
            echo ""
        fi
    fi
    
    # node_modules 폴더 찾기
    find . -type d -name "node_modules" | while read -r dir; do
        size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        echo "  발견: $dir ($size)"
        
        if [ "$DRY_RUN" != true ]; then
            rm -rf "$dir"
            echo "    ✓ 삭제 완료"
        fi
    done
    
    echo ""
fi

# 최종 용량 확인
if [ "$DRY_RUN" != true ]; then
    echo "=== 정리 완료 ==="
    total_size=$(du -sh . 2>/dev/null | cut -f1)
    echo "현재 프로젝트 총 용량: $total_size"
    echo ""
    echo "💡 의존성을 재설치하려면 각 프로젝트에서 'npm install'을 실행하세요."
else
    echo "=== DRY RUN 완료 ==="
fi

