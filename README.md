# 김수길 작품 웹사이트 (Astro)

## 구조

- `works/<작품번호>/info.md` 작품 정보, `image.jpg` 웹용 이미지 (작품 하나 = 폴더 하나)
- `src/data/exhibitions.json` 전시 목록
- `src/data/bio.json` 작가 약력 (직접 고친다. 근거는 ../work/profile/약력_정리.md)
- `src/data/series.ts` 연작 이름·순서·대표 작품
- `src/data/site.ts` 작가 이름, 첫 화면 대표 작품, '준비 중' 안내 켜고 끄기
- `src/pages/` 페이지 (처음, 작품, 연작, 작품 상세, 작가, 전시)

## 검수 중 (지금)

`works/`와 `src/data/exhibitions.json`은 `../scripts/export_site.py`가 만든다. 직접 고치지 않는다.
번호 미상 작품(U)은 이름표 `../catalog/unnamed.csv`에 있는 35점만 '제목 미상' 묶음으로 나간다. 제목과 번호는 이름표에 적는다.
작품표를 고친 뒤에는 상위 폴더에서 차례로 실행한다.

```
zsh scripts/update_site.sh            # 아래 여섯 단계를 한 번에. --push 를 붙이면 커밋하고 올린다
python3 scripts/merge.py && python3 scripts/exhibitions.py && python3 scripts/review_queue.py && python3 scripts/check.py && python3 scripts/review.py
python3 scripts/export_site.py
```

## 검수가 끝난 뒤 (방식 A)

`export_site.py`를 마지막으로 한 번 돌리고, info.md 맨 위의 '자동 생성' 줄을 지운 다음부터는
info.md와 image.jpg를 직접 고친다.

## 미리보기와 빌드

```
npm install          # 처음 한 번
npm run dev          # http://localhost:4321
npm run build        # dist/ 에 정적 사이트
```
