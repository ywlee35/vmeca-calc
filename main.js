// ============================================================
// CONSTANTS & STATE
// ============================================================
const G = 9.81;
let lang = 'ko';
let unitSys = 'metric';
let liftMode = 'horizontal';
let SF = 1.5;
let useAcc = false;
let sCupMode = 'dia';
let sUseAcc = true;
let convDir = 'mi';
let flMode = 'flow';
let eHdDir = 'm2s';
let eHdiaType = 'vac';
let eHdb = 'drop'; // 'drop' or 'velo'

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  ko: {
    'hdr-sub': '진공 계산기 v7.9',
    'tab-tf': '흡착력 계산', 'tab-tc': '컵 선정', 'tab-tfl': '유량 계산', 'tab-tv': '단위 변환', 'tab-tr': '참고 데이터',
    'tab-troi': 'ROI 계산', 'tab-tcbm': 'CBM 계산', 'tab-teng': '엔지니어링', 'tab-tset': '⚙️ 설정',
    't1h': '이론 흡착력 계산', 't1s': '흡착컵의 이론 흡착력을 계산하고 안전 여부를 검토합니다.',
    't2h': '흡착컵 수량 및 사이즈 예측', 't2s': '워크피스 하중에 필요한 수량과 직경을 계산합니다.',
    'tbtn-tc-dia': '직경 계산', 'tbtn-tc-qty': '수량 계산',
    't3h': '진공 유량 및 이젝터 선정', 't3s': '진공 이젝터의 필요 유량과 흡착 응답 시간을 계산합니다.',
    't4h': '단위 변환기', 't4s': '진공 자동화 업무에 필요한 메트릭 ↔ 임페리얼 단위를 빠르게 변환합니다.',
    't5h': '참고 데이터 & 수식',
    'c1h': '① 흡착컵 사양', 'c2h': '② 작업 조건', 'c3h': '계산 결과', 'c4h': '상세 계산',
    'c5h': '입력 조건', 'c6h': '권장 흡착컵 사이즈', 'c7h': 'VMECA 표준 사이즈 적합성', 'c4h-s': '상세 계산',
    'c8h': '시스템 조건', 'c9h': '필요 이젝터 사양', 'c10h': 'VMECA 이젝터 선정 가이드',
    'c11h': '안전계수 가이드', 'c12h': '마찰계수 μ 참고값', 'c13h': '하중 케이스별 흡착력 공식', 'c14h': '고도별 기압 보정',
    'c15h': '압력 단위 변환표 (Pressure Conversion)',
    'c16h': '진공압 비교표 — 대기압 이하 (Vacuum)', 'tp-vac-tbl': '※ 대기압(101.325 kPa) 기준 음압(게이지). 진공 자동화 업무 기준값.',
    'th-vdesc': '진공도 수준', 'th-vapp': '대표 적용',
    'vr1': '대기압 (기준)', 'vr2': '저진공', 'vr3': '일반 진공', 'vr4': '표준 진공 (권장)', 'vr5': '고진공', 'vr6': '최대 진공 (이론)', 'vr7': '멕시코시티 보정 최대',
    'va1': '기준점', 'va2': '다공성/거친 표면 흡착', 'va3': '일반 pick & place', 'va4': 'VMECA 이젝터 기본 설정', 'va5': '평탄/밀도 높은 표면', 'va6': '완전 진공 (이론치)', 'va7': '고도 2,240m 현지 최대',
    'c17h': '양압 비교표 — 대기압 이상 (Positive Pressure)', 'tp-pos-tbl': '※ 게이지 압력 기준 (0 = 대기압). 공압 액추에이터, 이젝터 공급압 등에 사용.',
    'th-pdesc': '압력 수준', 'th-papp': '대표 적용',
    'pr1': '대기압 (기준)', 'pr2': '저압', 'pr3': '표준 공급압 (권장)', 'pr4': '중압', 'pr5': '고압', 'pr6': '산업 최대',
    'pa1': '기준점', 'pa2': '저압 공급 / 소형 이젝터', 'pa3': 'VMECA 이젝터 공급압', 'pa4': '대형 실린더 / 클램프', 'pa5': '고압 공압 시스템', 'pa6': '고압 공압 배관 최대',
    'c18h': '유량 비교표 (Flow Rate Comparison)',
    'th-fapp': '대표 적용 (VMECA)',
    'fr1': '소형 이젝터 (VME-07 이하)', 'fr2': 'VME-07', 'fr3': 'VME-10 / VML-07', 'fr4': 'VME-15', 'fr5': 'VME-20 / VML-10', 'fr6': 'VME-30', 'fr7': '대형 다중 이젝터 시스템',
    'c19h': '나사 규격 및 호환 시스템 (Thread Systems & Compatibility)', 'tp-thread': '※ 공압 피팅 선정 시 나사 규격 혼용에 주의. PT(R)/NPT는 테이퍼 나사, G(PF)/NPSM은 평행 나사.',
    'th-tname': '규격명', 'th-ttype': '나사 형태', 'th-tregion': '주 사용 지역', 'th-tangle': '나사산 각도', 'th-ttaper': '테이퍼 여부', 'th-tcompat': '호환 규격', 'th-tnote': '비고',
    'tt1': 'BSPT (영국식 테이퍼)', 'tt2': 'BSPP (영국식 평행)', 'tt3': '미국식 테이퍼', 'tt4': '미국식 평행', 'tt5': 'ISO 미터식 평행',
    'tr1a': '한국, 일본, 아시아', 'tr2a': '한국, 유럽, 아시아', 'tr3a': '미국, 캐나다', 'tr4a': '미국, 캐나다', 'tr5a': '한국, 유럽, 전세계',
    'tc1': 'R(외) ↔ Rc(내) 호환<br><em>NPT와 호환 불가</em>', 'tc2': 'G(외) ↔ G(내) 호환<br>씰 테이프 또는 O-ring 필요', 'tc3': 'NPS(평행)와 부분 호환<br><em>PT/G와 호환 불가</em>', 'tc4': 'NPT와 부분 호환<br>씰 필요', 'tc5': '규격 내 호환<br>M5 흡착컵 피팅에 사용',
    'tn1': 'VMECA 표준 규격', 'tn2': '유럽 공압 피팅 주류', 'tn3': '미주 고객사 납품 시 확인 필수', 'tn4': '배관 연결부 확인 필요', 'tn5': 'M5, M6, M8 소형 피팅',
    'tt1t': '테이퍼', 'tt2t': '평행', 'tt3t': '테이퍼', 'tt4t': '평행', 'tt5t': '평행',
    'c19b': '나사 호칭경 빠른 참조 (PT/G/NPT)',
    'th-tnominal': '호칭경', 'th-tptod': 'PT/G 외경 (mm)', 'th-tpttpi': 'PT/G TPI', 'th-tnptod': 'NPT 외경 (mm)', 'th-tnpttpi': 'NPT TPI', 'th-tflow': '적용 유량',
    'tf1': '소형 이젝터 포트', 'tf2': '일반 이젝터 공급 포트', 'tf3': '중형 이젝터 배기 포트', 'tf4': '대형 이젝터 / 매니폴드', 'tf5': '대형 배관 연결', 'tf6': '메인 공급 배관',
    'compat-ok-hdr': '✅ 호환 가능 조합', 'compat-ok': 'PT(R) 외경 ↔ Rc 내경 / G(PF) 외경 ↔ G 내경 / NPT 외경 ↔ NPS 내경 (씰 권장)',
    'compat-no-hdr': '❌ 호환 불가 조합', 'compat-no': 'PT/G ↔ NPT/NPS (나사산 각도 55° vs 60° 불일치) / 강제 체결 시 누설 및 파손 위험',
    'l-ctype': '컵 형태', 'o-circle': '원형 (Round)', 'o-oval': '타원형 (Oval)', 'o-rect': '사각형 (Rect)',
    'l-cnt': '흡착컵 수량 (개)', 'l-vac1': '진공압력', 'tp-vac1': '※ 대기압 기준 게이지압. 일반 이젝터: -60~-80 kPa',
    'l-mode': '리프팅 방식', 'mb-h': '수평 ↕', 'mb-v': '수직 ↔', 'mb-t': '경사 ↗',
    'l-mu': '마찰계수 μ', 'mo1': '0.1 — 기름 묻은 금속', 'mo2': '0.3 — 오일 코팅 표면', 'mo3': '0.5 — 금속/유리/석재', 'mo4': '0.6 — 목재/플라스틱', 'mo5': '0.7 — 고무 재질',
    'l-sf': '안전계수 S', 'tp-sf': '1.5: 매끄러운/수평 | 2.0: 일반 | 2.5+: 다공성/거친 | 4.0: 수직+이동',
    'l-acc': '가속도 포함', 'acc-n': '미포함', 'acc-y': '포함',
    'tp-acc': '※ 9.81 m/s² = 1G',
    'rl-area': '유효 흡착 면적', 'rl-thy': '이론 흡착력 (전체)', 'rl-req': '필요 흡착력', 'rl-mrg': '안전 여유도',
    'fb1n': 'P: 진공압(kPa) × A: 유효면적(cm²) × n: 컵수',
    'l-sm': '워크피스 무게 W (kg)', 'l-sv': '진공압력', 'l-sn': '흡착컵 수량',
    'l-smode': '리프팅 방식', 'so-h': '수평 흡착 (수직 하중)', 'so-v': '수직 흡착 (측면 이동)',
    'l-smu': '마찰계수 μ', 'smo1': '0.1 — 기름 묻은 금속', 'smo2': '0.5 — 금속/유리/석재', 'smo3': '0.7 — 고무 표면',
    'l-ssf': '안전계수 S', 'ssf1': '1.5 — 매끄러운 표면', 'ssf2': '2.0 — 일반 조건', 'ssf3': '2.5 — 다공성/거친 표면', 'ssf4': '4.0 — 수직+이동',
    'l-scdia': '흡착컵 직경 (mm)', 'l-sacc': '가속도 포함 여부', 'tp-sacc': '※ 9.81 m/s² = 1G', 'l-sav': '가속도 a (m/s²)',
    'rl-sdia': '최소 필요 직경 (컵 1개당)', 'rl-sf2': '필요 흡착력 (F)', 'rl-sa': '요구 총 면적 (A)',
    'rl-sqty': '최소 필요 수량', 'ru-sqty': '개 (pcs)',
    'sacc-y': '포함', 'sacc-n': '미포함',
    'th-d': '직경', 'th-f': '이론 흡착력', 'th-m': '안전 여유', 'th-r': '적합성', 's-tbl-ph': '계산 후 표시됩니다',
    'l-fv': '배출 에어량', 'tp-fv': '흡착컵 + 배출 에어량의 합계',
    'l-fvac': '목표 진공압력', 'l-ft': '목표 응답 시간 t (sec)',
    'l-f-hid': '배관 내경', 'l-f-hlen': '배관 길이',
    'l-fl': '누설 유량 Q_leak (L/min)', 'tp-fl': '다공성 워크피스: 0.1~1.0 L/min 예상',
    'l-fn': '흡착컵 수량',
    'l-f-sf': '안전 계수 S (실무 여유율)', 'tp-f-sf': '1.5~2.0 권장 (비선형성 및 배관 저항 고려)',
    'rl-flow': '평균 필요 유량 (Q_avg)', 'rl-peak': '권장 선정 유량 (Q_sel)', 'rl-air': '평균 공기 소비량', 'rl-rt': '응답 시간',
    'fb3n': 'V_work: 용기 체적 | V_line: 배관 체적 | n: 수량 | P_vac: 목표 진공압 | P_atm: 대기압 | Ratio: 진공도 비율 | t: 목표 시간 | S.F.: 안전율 | Q_leak: 누설 유량 | Q_pump: 펌프 유량',
    'c10h-f': '상세 계산', 'tp-f-time': '※ 실무 권장: 목표 사이클 타임보다 10~20% 짧게 설정',
    'f-form-q': '필요 유량 (Q):', 'f-form-t': '도달 시간 (t):',
    'c9h': '필요 이젝터 사양', 'c10h': 'VMECA 이젝터 선정 가이드',
    'c11h-f': '진공 시스템 설계 가이드',
    'f-gui-1': '① 진공 도달의 비선형성: 목표 도달 직전 속도가 저하되므로 이론치 대비 1.5~2.0배의 여유를 권장합니다.',
    'f-gui-2': '② 배관 저항: 긴 호스, 엘보, 필터 등은 유량 손실을 유발하므로 더 큰 사양의 이젝터가 필요합니다.',
    'f-gui-3': '③ 누설량 감안: 통기성 워크나 틈새 예상 시 평균 유량에 누설 유량(Q_leak)을 합산하여 설계하십시오.',
    'f-gui-4': '④ 사이클 타임: 밸브 개폐 및 신호 지연 시간을 포함한 목표 시간(t)을 설정하는 것이 실무적입니다.',
    'f-gui-5': '⑤ 펌프 선정: 목표 진공도가 -80kPa 이상인 경우, 최대 성능이 그보다 높은 이젝터를 선정하십시오.',
    'th-em': '모델', 'th-ef': '흡인 유량', 'th-es': '적합 여부',
    'qref-ttl': '빠른 참조표',
    'qh-p': '압력 Pressure', 'qh-l': '길이 Length', 'qh-f': '힘 Force', 'qh-m': '질량 Mass', 'qh-fl': '유량 Flow Rate', 'qh-av': '면적/용적 Area/Volume',
    'dir-mi': 'METRIC → IMPERIAL', 'dir-im': 'IMPERIAL → METRIC',
    'cvh-p': '압력 (Pressure)', 'cvh-l': '길이 (Length)', 'cvh-f': '힘 (Force)', 'cvh-m': '질량 (Mass)', 'cvh-a': '면적 (Area)', 'cvh-fl': '유량 (Flow Rate)', 'cvh-v': '용적 (Volume)', 'cvh-t': '온도 (Temperature)', 'cvt-tc': '°C → °F', 'cvt-tf': '°F → °C', 'tp-temp': '※ °F = °C × 9/5 + 32 | °C = (°F − 32) × 5/9',
    'th-sv': 'S 값', 'th-sc': '적용 조건',
    'sr1': '매끄럽고 밀도 높은 표면 / 수평 흡착, 이동 없음', 'sr2': '수평 흡착 / 수직 하중만 작용', 'sr3': '일반 조건 (표준값)', 'sr4': '다공성·거친·불균일 표면', 'sr5': '수직 흡착 + 수평 이동 조합',
    'th-mat': '표면 재질', 'th-dry': 'μ (건조)', 'th-wet': 'μ (습윤)',
    'mr1': '금속 (철판/알루미늄)', 'mr2': '유리', 'mr3': '목재', 'mr4': '플라스틱', 'mr5': '고무', 'mr6': '석재/세라믹',
    'cas1': 'Case I: 수평 흡착 – 수직 이동만', 'cas2': 'Case II: 수평 흡착 – 수직 + 수평 이동', 'cas3': 'Case III: 수직 흡착 – 수직 방향 이동',
    'cf1': 'g=9.81 m/s², a=가속도, S=안전계수, n=컵수', 'cf2': 'μ=마찰계수',
    'th-alt': '고도', 'th-mv': '최대 진공압', 'alt0': '0 m (해수면)', 'altmx': '멕시코시티 (2,240m)',
    'tp-alt': '※ 고지대 고객사 (Zucarmex 등) 적용 시 반드시 보정값 사용',
    // unit-dependent
    'l-dia': '컵 직경', 'l-ca': '장축 a', 'l-cb': '단축 b', 'l-cw': '가로 W', 'l-ch': '세로 H', 'l-mass': '워크피스 질량 W',
    'l-av-ms': '가속도 a (m/s²)', 'l-av-ft': '가속도 a (ft/s²)', 'tp-acc-ms': '※ 9.81 m/s² = 1G', 'tp-acc-ft': '※ 32.2 ft/s² = 1G',
    'l-sm': '워크피스 무게 W', 'l-scdia': '흡착컵 직경',
    'l-fv-cm': '배출 에어량', 'l-fv-in': '배출 에어량',
    'l-fl-lm': '누설 유량 Q_leak (L/min)', 'l-fl-sc': '누설 유량 Q_leak (SCFM)',
    'tp-fl-lm': '다공성 워크피스: 0.1~1.0 L/min 예상', 'tp-fl-sc': '다공성 워크피스: ~0.004-0.035 SCFM 예상',
    'verdict-safe': '안전 — 이론 흡착력이 필요 흡착력 대비', 'pct-margin': '% 여유 있음',
    'verdict-warn': '주의 — 흡착 가능하나 여유가 적습니다. 컵 크기 또는 수량 증가 검토',
    'verdict-fail': '불충분 —',
    'steps-area': '① 유효 면적:', 'steps-thy': '② 이론 흡착력:', 'steps-mass': '③ 워크피스 무게:', 'steps-sf': '④ 안전계수 적용:', 'steps-mrg': '⑤ 여유도:',
    'steps-per-cup': '/컵', 'steps-cups': '개', 'steps-req-f': '① 필요 흡착력 (F):', 'steps-req-a': '② 요구 총 면적 (A):', 'steps-req-d': '③ 최소 필요 직경:', 'steps-req-q': '③ 최소 필요 수량:',
    'tbl-ok': '적합', 'tbl-warn': '주의', 'tbl-fail': '부족',
    'ej-ok': '선정 가능', 'ej-no': '유량 부족',
    'mode-tip-h': '수평 흡착: 컵이 위를 향해 중력 방향으로 들어올림',
    'mode-tip-v': '수직 흡착: 컵이 옆을 향해 중력에 수직 방향으로 이동',
    'mode-tip-t': '경사 흡착: 수직+수평 복합 이동. 가장 큰 안전계수 필요',
    'upill-metric': 'SI · mm / kg / kPa / N', 'upill-imperial': 'US · in / lb / PSI / lbf',
    'tab-tcbm': 'CBM 계산',
    't6h': 'CBM 계산기', 't6s': '박스/팔레트 치수를 입력하여 CBM(Cubic Meter)을 계산하고 해상·항공 운임을 견적합니다.',
    'cbm-c1h': '① 화물 리스트', 'cbm-c2h': '② 운임 단가 설정', 'cbm-c3h': '계산 결과', 'cbm-c4h': '컨테이너 적재율', 'cbm-c5h': '운임 견적 (참고용)', 'cbm-c6h': '품목별 상세',
    'cbm-unit-lbl': '치수 단위', 'cbm-add-btn': '＋ 품목 추가',
    'cbm-ocean-lbl': '해상 운임 (USD/CBM)', 'cbm-air-lbl': '항공 운임 (USD/kg)', 'cbm-chw-lbl': '항공 부피중량 환산 (cm³/kg)',
    'cbm-rl-totalcbm': '총 CBM', 'cbm-rl-totalw': '총 중량', 'cbm-rl-totalv': '총 부피 (cm³)', 'cbm-rl-items': '품목 수 / 박스 수',
    'th-cont': '컨테이너', 'th-cap': '용량 (CBM)', 'th-util': '적재율', 'th-qty': '적재 가능 수량',
    'cbm-rl-ocean': '해상 운임', 'cbm-rl-air': '항공 운임', 'cbm-rl-chw': '항공 과금중량',
    'cbm-u-ocean': 'USD (CBM 기준)', 'cbm-u-air': 'USD (과금중량 기준)',
    'th-item': '#', 'th-idesc': '품목명', 'th-idim': '치수 (L×W×H)', 'th-iqty': '수량', 'th-iw': '중량(kg)', 'th-icbm': 'CBM',
    'cbm-tp-disc': '※ 위 운임은 참고용 견적입니다. 실제 운임은 출발지/목적지, 시즌, 포워더 계약 조건에 따라 다를 수 있습니다.',
    'cbm-info': '<strong>CBM (Cubic Meter)</strong> = 가로(m) × 세로(m) × 높이(m)<br>해상 운임은 실제 CBM 기준. 항공은 실중량과 부피중량(Chargeable Weight) 중 큰 값 적용.',
    'cbm-lbl-item': '품목', 'cbm-lbl-name': '품목명', 'cbm-lbl-l': '가로 L', 'cbm-lbl-w': '세로 W', 'cbm-lbl-h': '높이 H', 'cbm-lbl-qty': '수량', 'cbm-lbl-wt': '중량 (kg/박스)', 'cbm-lbl-del': '삭제',
    'tt5n': 'M (미터)', 'cbm-chw-o1': '6,000 (IATA 국제선)', 'cbm-chw-o2': '5,000 (일반 항공)', 'cbm-chw-o3': '4,000 (특급 항공)',
    'cbm-ph-name': '예: VMECA 진공컵 박스',
    // Engineering Tab
    'tab-teng': '엔지니어링',
    't7h': '엔지니어링 툴', 't7s': '진공 시스템 설계에 필요한 부가적인 엔지니어링 계산을 수행합니다.',
    'eh-hd': '① 배관 분배 (Hose Distribution)', 'el-hd-main': '메인배관 사이즈', 'el-hd-sub': '서브배관 사이즈',
    'er-hd-lbl': '추천 브랜치 호스 내경', 'etp-hd': '※ 유체 역학 연속 방정식(단면적 합산법) 기준 최적 사이즈',
    'eh-hd-form-lbl': '공식:', 'eh-hd-rec-ttl': '실무 추천 규격 (메인 12mm 기준)',
    'eh-hd-rec-i1': '• 2분지: 8~9 mm', 'eh-hd-rec-i2': '• 4분지: 6 mm', 'eh-hd-rec-i3': '• 6~8분지: 4 mm',
    'eh-of': '② 오리피스 유량 (Orifice Flow)', 'el-of-dia': '오리피스 직경', 'el-of-vac': '진공 압력',
    'er-of-lbl': '예상 누설 유량', 'etp-of': '※ 배관 내 진공도가 유지될 때 공기가 유입되는 대략적 유량',
    'eh-of-guide-ttl': '오리피스 유량이란? (예상 누설량)',
    'eh-of-guide-desc': '진공 시스템의 미세 틈새나 다공성 워크를 통해 유입되는 공기량을 파악하여 실무 설계를 돕는 지표입니다.',
    'eh-of-guide-form': '<strong>공식:</strong> Q ≈ 0.12 × D² × √P',
    'eh-of-guide-usage': '• <strong>이젝터 선정:</strong> 필요 유량에 누설 유량(Q_leak)을 합산하여 설계하십시오.<br>• <strong>설계 최적화:</strong> 누설이 크면 이젝터 증설보다 배관 보수가 경제적입니다.',
    'eh-hdia': '③ 권장 배관 직경 (Hose Diameter)', 'el-hdia-base': '산정 기준', 'btn-hdb-drop': '압력 강하', 'btn-hdb-velo': '유속',
    'el-hdia-flow': '유량', 'el-hdia-len': '배관 길이', 'el-hdia-velo': '유속', 'el-hdia-pwork': '게이지 압력', 'el-hdia-drop': '허용 압력 강하',
    'el-hdia-drop': '허용 압력 강하', 'er-hdia-lbl': '최소 권장 내경', 'etp-hdia': '※ 배관 마찰 저항 (Darcy-Weisbach / 층류 근사치 기반 경험공식) 적용',
    'eh-hdia-guide-ttl': '배관 설계 및 압력 강하 가이드',
    'eh-hdia-guide-theory': '<strong style="color:var(--accent2);">[기초 이론: Darcy-Weisbach]</strong><br>압력 강하(ΔP)는 유속의 제곱(v²)과 길이(L)에 비례하고, 내경의 5제곱(D⁵)에 반비례합니다.<br>즉, <strong>내경을 조금만 키워도 압력 손실을 획기적으로 줄일 수 있습니다.</strong>',
    'eh-hdia-guide-vac': '<strong style="color:var(--accent2);">1. 진공측 설계 (Vacuum Side)</strong><br>• <strong>특성:</strong> 밀도가 낮아 공기가 팽창하며 유속이 급증합니다.<br>• <strong>권장 유속:</strong> 15~20m/s (응답 중시형은 10m/s)<br>• <strong>허용 손실:</strong> 목표 진공도의 3~5% 이내 (약 3~5kPa)<br>• <strong>실무:</strong> 계산치보다 1.5~2.0배 높게 안전율을 잡는 것이 정석입니다.',
    'eh-hdia-guide-air': '<strong style="color:var(--accent2);">2. 압축공기측 설계 (Supply Side)</strong><br>• <strong>특성:</strong> 밀도가 높아 마찰 저항이 크며 성능에 직결됩니다.<br>• <strong>권장 유속:</strong> 10~15m/s 이하<br>• <strong>허용 손실:</strong> 공급 압력의 5% 이내 (약 0.1~0.3bar)<br>• <strong>실무:</strong> 모든 이젝터가 동시 작동할 때의 총 소모량을 기준으로 하십시오.',
    'eh-hdia-guide-table': '<strong style="color:var(--accent2);">[실무용 에어 배관 선정 표 (10m 기준)]</strong><br>• ~100 L/min: ID 4~5mm (6π)<br>• 100~300 L/min: ID 6~8mm (8π/10π)<br>• 300~600 L/min: ID 10~12mm (12π/14π)',
    'eh-hdia-guide-tip': '💡 <strong>전문가 팁:</strong> 배관 곡관(Elbow)이나 피팅은 직선 배관 수십 배의 저항을 유발하는 <strong>\'등가 길이\'</strong>를 가지므로, 실제 길이보다 여유 있게 내경을 선정하십시오.',
    'eh-alt': '④ 고도별 대기압 (Altitude Pressure)', 'el-alt-h': '해발 고도 (m)', 'el-alt-u': '진공 압력 단위', 'er-alt-lbl': '대기압 (절대압)',
    'etp-alt': '※ 멕시코시티(2,240m) 등 고지대에서 이젝터의 최대 진공 도달 한계치는 이 대기압을 넘을 수 없음. 우천/저기압 시 일반 대기압에서 약 5% 추가 감소.',
    'l-fl-mode': '계산 모드', 'fl-m-flow': '필요 유량 계산', 'fl-m-time': '도달 시간 계산', 'l-fe': '펌프/이젝터 도달 유량 (L/min)',
    'el-hd-dir': '계산 방향', 'btn-hd-m2s': 'Main → Sub', 'btn-hd-s2m': 'Sub → Main', 'el-hd-qty': '서브 배관 수량 (개)',
    'er-hd-lbl2': '추천 메인 배관 내경', 'el-hdia-type': '배관 종류', 'btn-hdia-vac': '진공', 'btn-hdia-air': '압축공기',
    'el-hdia-pwork': '게이지 압력', 'er-alt-wv': '저기압 시 최대 진공 한계',
    // ROI Tab
    'tab-troi': 'ROI 계산',
    't8h': '투자 회수 (ROI) 계산기', 't8s': '핸들링 장비 및 자동화 시스템 도입에 따른 예상 투자 회수 기간을 계산합니다.',
    'tbtn-roi-m': '수동 핸들링 장비', 'tbtn-roi-a': '자동화 시스템',
    'rh-m1': '① 작업 정보 입력', 'rh-m2': '계산 결과',
    'rl-m-days': '연간 근무일 (일/년)', 'rl-m-hours': '일일 근무 시간 (시간/일)',
    'rl-m-cost': '시간당 인건비 (₩/시간)', 'rl-m-share': '임금 중 인건비 비중 (%)',
    'rl-m-hand': '핸들링 작업 비중 (%)', 'rl-m-prod': '예상 생산성 향상률 (%)',
    'rl-m-sick': '병가 감소 예상일 (일/년)', 'rl-m-inv': '진공 장비 투자 비용 (₩)',
    'rtp-m-share': '전체 임금 중 순수 인건비에 해당하는 백분율 (일반적으로 80~100%)',
    'rtp-m-hand': '근무 시간 중 실제 물건을 취급하는 시간의 비중',
    'rr-m-time-lbl': '예상 투자 회수 기간', 'ru-m-time': '개월 (Months)',
    'rr-m-save-lbl': '생산성 향상 추가 이익 (연간)', 'ru-m-save': '₩ / 년',
    'rr-m-sick-lbl': '병가 감소 절감액 (연간)', 'ru-m-sick': '₩ / 년',
    'rh-a1': '① 자동화 요건 입력', 'rh-a2': '계산 결과',
    'rl-a-cost': '작업자 1인당 연간 인건비 (₩)', 'rl-a-emp': '교대 당 자동화로 대체되는 인원 수',
    'rl-a-shift': '일일 교대 근무 횟수', 'rtp-a-shift': '예: 2교대, 3교대',
    'rl-a-inv': '자동화 장비 투자 비용 (₩)',
    'rr-a-time-lbl': '예상 투자 회수 기간', 'ru-a-time': '개월 (Months)',
    'rr-a-save-lbl': '총 인건비 절감액 (연간)', 'ru-a-save': '₩ / 년',
    'rt-m-sum-formula': '총 연간 절감 이익 = 생산성 향상 이익 + 병가 감소 절감액',
    'rt-m-time-formula': '회수 기간(개월) = (투자 비용 / 총 연간 절감 이익) × 12',
    'rt-a-sum-formula': '총 절감액 = 교대 당 대체 인원 × 일일 교대 횟수 × 1인당 연간 인건비',
    'rt-a-time-formula': '회수 기간(개월) = (투자 비용 / 총 연간 절감액) × 12',
    // Settings Tab
    'tset-h': '⚙️ 설정', 'tset-sub': '앱 표시 방식 및 단위 시스템을 설정합니다.',
    'set-th-h': '테마 (Theme)', 'set-th-desc': '화면의 밝기 모드를 선택합니다.',
    'set-lang-h': '언어 (Language)', 'set-lang-desc': '인터페이스 언어를 선택합니다.',
    'set-unit-h': '단위 시스템 (Unit System)', 'set-unit-desc': '계산에 사용할 단위 시스템을 선택합니다.',
  },
  en: {
    'hdr-sub': 'Vacuum Calculator v7.9',
    'tab-tf': 'Force Calc', 'tab-tc': 'Cup Select', 'tab-tfl': 'Flow Calc', 'tab-tv': 'Unit Convert', 'tab-tr': 'Reference',
    'tab-troi': 'ROI Calc', 'tab-tcbm': 'CBM Calc', 'tab-teng': 'Engineering', 'tab-tset': '⚙️ Settings',
    't1h': 'Theoretical Suction Force', 't1s': 'Calculate theoretical suction force and verify safety margin.',
    // Settings Tab
    'tset-h': '⚙️ Settings', 'tset-sub': 'Configure display mode and unit system.',
    'set-th-h': 'Theme', 'set-th-desc': 'Select screen brightness mode.',
    'set-lang-h': 'Language', 'set-lang-desc': 'Select the interface language.',
    'set-unit-h': 'Unit System', 'set-unit-desc': 'Select the unit system for calculations.',
    't2h': 'Cup Quantity & Size Calculator', 't2s': 'Calculate required diameter or quantity based on workpiece load.',
    'tbtn-tc-dia': 'Calc Diameter', 'tbtn-tc-qty': 'Calc Quantity',
    't3h': 'Vacuum Flow & Ejector Selection', 't3s': 'Calculate required ejector flow rate and suction response time.',
    't4h': 'Unit Converter', 't4s': 'Quickly convert between Metric and Imperial units for vacuum automation work.',
    't5h': 'Reference Data & Formulas',
    'c1h': '① Cup Specifications', 'c2h': '② Work Conditions', 'c3h': 'Results', 'c4h': 'Calculation Detail',
    'c5h': 'Input Conditions', 'c6h': 'Recommended Cup Size', 'c7h': 'VMECA Standard Size Suitability', 'c4h-s': 'Calculation Detail',
    'c8h': 'System Conditions', 'c9h': 'Required Ejector Specs', 'c10h': 'VMECA Ejector Selection Guide',
    'c11h': 'Safety Factor Guide', 'c12h': 'Friction Coefficient μ Reference', 'c13h': 'Force Formulas by Load Case', 'c14h': 'Altitude Pressure Correction',
    'c15h': 'Pressure Unit Conversion Table',
    'c16h': 'Vacuum Comparison Table — Pressure Below Atmospheric', 'tp-vac-tbl': '※ Gauge pressure ref. atmospheric (101.325 kPa). Standard reference for vacuum automation.',
    'th-vdesc': 'Vacuum Level', 'th-vapp': 'Typical Application',
    'vr1': 'Atmospheric (Reference)', 'vr2': 'Low Vacuum', 'vr3': 'General Vacuum', 'vr4': 'Standard Vacuum (Recommended)', 'vr5': 'High Vacuum', 'vr6': 'Max Vacuum (Theoretical)', 'vr7': 'Mexico City Corrected Max',
    'va1': 'Reference point', 'va2': 'Porous / rough surface gripping', 'va3': 'General pick & place', 'va4': 'VMECA ejector default setting', 'va5': 'Flat / dense surface', 'va6': 'Perfect vacuum (theoretical)', 'va7': 'Max at altitude 2,240m',
    'c17h': 'Positive Pressure Comparison Table — Pressure Above Atmospheric', 'tp-pos-tbl': '※ Gauge pressure (0 = atmospheric). Used for pneumatic actuators, ejector supply pressure, etc.',
    'th-pdesc': 'Pressure Level', 'th-papp': 'Typical Application',
    'pr1': 'Atmospheric (Reference)', 'pr2': 'Low Pressure', 'pr3': 'Standard Supply (Recommended)', 'pr4': 'Medium Pressure', 'pr5': 'High Pressure', 'pr6': 'Industrial Maximum',
    'pa1': 'Reference point', 'pa2': 'Low supply / small ejectors', 'pa3': 'VMECA ejector supply pressure', 'pa4': 'Large cylinders / clamps', 'pa5': 'High-pressure pneumatic systems', 'pa6': 'Max pneumatic piping pressure',
    'c18h': 'Flow Rate Comparison Table',
    'th-fapp': 'Typical Application (VMECA)',
    'fr1': 'Small ejectors (VME-07 and below)', 'fr2': 'VME-07', 'fr3': 'VME-10 / VML-07', 'fr4': 'VME-15', 'fr5': 'VME-20 / VML-10', 'fr6': 'VME-30', 'fr7': 'Large multi-ejector systems',
    'c19h': 'Thread Systems & Compatibility', 'tp-thread': '※ Verify thread standards when selecting pneumatic fittings. PT(R)/NPT = tapered; G(PF)/NPSM = parallel.',
    'th-tname': 'Standard', 'th-ttype': 'Thread Form', 'th-tregion': 'Primary Region', 'th-tangle': 'Thread Angle', 'th-ttaper': 'Taper/Parallel', 'th-tcompat': 'Compatible Standards', 'th-tnote': 'Notes',
    'tt1': 'BSPT (British Standard Tapered)', 'tt2': 'BSPP (British Standard Parallel)', 'tt3': 'American Taper', 'tt4': 'American Straight', 'tt5': 'ISO Metric Parallel',
    'tr1a': 'Korea, Japan, Asia', 'tr2a': 'Korea, Europe, Asia', 'tr3a': 'USA, Canada', 'tr4a': 'USA, Canada', 'tr5a': 'Korea, Europe, Worldwide',
    'tc1': 'R(ext) ↔ Rc(int) compatible<br><em>Incompatible with NPT</em>', 'tc2': 'G(ext) ↔ G(int) compatible<br>Seal tape or O-ring required', 'tc3': 'Partial compat. with NPS<br><em>Incompatible with PT/G</em>', 'tc4': 'Partial compat. with NPT<br>Seal required', 'tc5': 'Compatible within standard<br>Used for M5 cup fittings',
    'tn1': 'VMECA standard specification', 'tn2': 'Dominant in European pneumatics', 'tn3': 'Must verify for US/Mexico customers', 'tn4': 'Check connection type', 'tn5': 'M5, M6, M8 small fittings',
    'tt1t': 'Tapered', 'tt2t': 'Parallel', 'tt3t': 'Tapered', 'tt4t': 'Parallel', 'tt5t': 'Parallel',
    'c19b': 'Thread Nominal Size Quick Reference (PT/G/NPT)',
    'th-tnominal': 'Nominal', 'th-tptod': 'PT/G OD (mm)', 'th-tpttpi': 'PT/G TPI', 'th-tnptod': 'NPT OD (mm)', 'th-tnpttpi': 'NPT TPI', 'th-tflow': 'Application',
    'tf1': 'Small ejector port', 'tf2': 'Standard ejector supply', 'tf3': 'Medium ejector exhaust', 'tf4': 'Large ejector / manifold', 'tf5': 'Large pipe connection', 'tf6': 'Main supply piping',
    'compat-ok-hdr': '✅ Compatible Combinations', 'compat-ok': 'PT(R) ext ↔ Rc int &nbsp;/&nbsp; G(PF) ext ↔ G int &nbsp;/&nbsp; NPT ext ↔ NPS int (seal recommended)',
    'compat-no-hdr': '❌ Incompatible Combinations', 'compat-no': 'PT/G ↔ NPT/NPS — thread angle mismatch (55° vs 60°). Forced assembly causes leaks &amp; damage',
    'l-ctype': 'Cup Shape', 'o-circle': 'Round', 'o-oval': 'Oval', 'o-rect': 'Rectangular',
    'l-cnt': 'Number of Cups', 'l-vac1': 'Vacuum Pressure', 'tp-vac1': '※ Gauge pressure. Typical ejector: -8.7 to -11.6 PSI',
    'l-mode': 'Lifting Mode', 'mb-h': 'Horizontal ↕', 'mb-v': 'Vertical ↔', 'mb-t': 'Inclined ↗',
    'l-mu': 'Friction Coeff. μ', 'mo1': '0.1 — Oily metal', 'mo2': '0.3 — Oil coated', 'mo3': '0.5 — Metal/Glass/Stone', 'mo4': '0.6 — Wood/Plastic', 'mo5': '0.7 — Rubber',
    'l-sf': 'Safety Factor S', 'tp-sf': '1.5: Smooth/Horizontal | 2.0: Standard | 2.5+: Porous/Rough | 4.0: Vertical+Move',
    'l-acc': 'Include Acceleration', 'acc-n': 'No', 'acc-y': 'Yes',
    'tp-acc': '※ 32.2 ft/s² = 1G',
    'rl-area': 'Effective Area', 'rl-thy': 'Theoretical Force (Total)', 'rl-req': 'Required Force', 'rl-mrg': 'Safety Margin',
    'fb1n': 'P: vacuum pressure × A: effective area × n: cups',
    'l-sm': 'Workpiece Weight W (lb)', 'l-sv': 'Vacuum Pressure', 'l-sn': 'Number of Cups',
    'l-smode': 'Lifting Mode', 'so-h': 'Horizontal (Vertical Load)', 'so-v': 'Vertical (Side Load)',
    'l-smu': 'Friction Coeff. μ', 'smo1': '0.1 — Oily metal', 'smo2': '0.5 — Metal/Glass/Stone', 'smo3': '0.7 — Rubber',
    'l-ssf': 'Safety Factor S', 'ssf1': '1.5 — Smooth surface', 'ssf2': '2.0 — Standard', 'ssf3': '2.5 — Porous/Rough', 'ssf4': '4.0 — Vertical+Move',
    'l-scdia': 'Cup Diameter (in)', 'l-sacc': 'Include Acceleration', 'tp-sacc': '※ 32.2 ft/s² = 1G', 'l-sav': 'Acceleration a (ft/s²)',
    'rl-sdia': 'Min Required Diameter (per cup)', 'rl-sf2': 'Required Force (F)', 'rl-sa': 'Required Total Area (A)',
    'rl-sqty': 'Min Required Quantity', 'ru-sqty': 'pcs',
    'sacc-y': 'Included', 'sacc-n': 'Excluded',
    'th-d': 'Diameter', 'th-f': 'Theor. Force', 'th-m': 'Margin', 'th-r': 'Result', 's-tbl-ph': 'Calculate to see results',
    'l-fv': 'Evacuation Volume', 'tp-fv': 'Sum of cup + evacuation volume',
    'l-fvac': 'Target Vacuum Pressure', 'l-ft': 'Target Response Time t (sec)',
    'l-f-hid': 'Hose ID', 'l-f-hlen': 'Hose Length',
    'l-fl': 'Leak Flow Q_leak (SCFM)', 'tp-fl': 'Porous workpiece: ~0.004–0.035 SCFM',
    'l-fn': 'Number of Cups',
    'l-f-sf': 'Safety Factor S (Margin)', 'tp-f-sf': '1.5–2.0 recommended (Non-linearity & Pipe resistance)',
    'rl-flow': 'Avg. Required Flow (Q_avg)', 'rl-peak': 'Recommended Flow (Q_sel)', 'rl-air': 'Avg. Air Consumption', 'rl-rt': 'Response Time',
    'fb3n': 'V_work: Work Vol. | V_line: Hose Vol. | n: Quantity | P_vac: Target Vac. | P_atm: Atmos. Press. | Ratio: Vac. Ratio | t: Target Time | S.F.: Safety Factor | Q_leak: Leak Flow | Q_pump: Pump Flow',
    'c10h-f': 'Detailed Calculation', 'tp-f-time': '※ Tip: Set 10-20% shorter than target cycle time',
    'f-form-q': 'Required Flow (Q):', 'f-form-t': 'Response Time (t):',
    'c9h': 'Required Ejector Specification', 'c10h': 'VMECA Ejector Selection Guide',
    'c11h-f': 'Vacuum Design Guide',
    'f-gui-1': '① Non-linearity: Evacuation slows near target vacuum. 1.5–2.0x margin is recommended.',
    'f-gui-2': '② Pipe Resistance: Long hoses, elbows, and filters cause pressure drop. Oversizing is necessary.',
    'f-gui-3': '③ Leakage: For porous parts or gaps, add estimated leak flow (Q_leak) to the average flow.',
    'f-gui-4': '④ Cycle Time: Include valve switching and signal delay times when setting target response time (t).',
    'f-gui-5': '⑤ Pump Selection: If target vacuum is above -80kPa, select an ejector with higher max performance.',
    'th-em': 'Model', 'th-ef': 'Suction Flow', 'th-es': 'Suitability',
    'qref-ttl': 'Quick Reference Table',
    'qh-p': 'Pressure', 'qh-l': 'Length', 'qh-f': 'Force', 'qh-m': 'Mass', 'qh-fl': 'Flow Rate', 'qh-av': 'Area / Volume',
    'dir-mi': 'METRIC → IMPERIAL', 'dir-im': 'IMPERIAL → METRIC',
    'cvh-p': 'Pressure', 'cvh-l': 'Length', 'cvh-f': 'Force', 'cvh-m': 'Mass', 'cvh-a': 'Area', 'cvh-fl': 'Flow Rate', 'cvh-v': 'Volume', 'cvh-t': 'Temperature', 'cvt-tc': '°C → °F', 'cvt-tf': '°F → °C', 'tp-temp': '※ °F = °C × 9/5 + 32 | °C = (°F − 32) × 5/9',
    'th-sv': 'S Value', 'th-sc': 'Condition',
    'sr1': 'Smooth dense surface / Horizontal, no lateral movement', 'sr2': 'Horizontal / vertical load only', 'sr3': 'Standard conditions', 'sr4': 'Porous / rough / irregular surfaces', 'sr5': 'Vertical grip + lateral movement',
    'th-mat': 'Surface Material', 'th-dry': 'μ (Dry)', 'th-wet': 'μ (Wet/Oily)',
    'mr1': 'Metal (steel/aluminum)', 'mr2': 'Glass', 'mr3': 'Wood', 'mr4': 'Plastic', 'mr5': 'Rubber', 'mr6': 'Stone/Ceramic',
    'cas1': 'Case I: Horizontal grip – vertical movement only', 'cas2': 'Case II: Horizontal grip – vertical + horizontal movement', 'cas3': 'Case III: Vertical grip – vertical movement',
    'cf1': 'g=9.81 m/s², a=acceleration, S=safety factor, n=cups', 'cf2': 'μ=friction coefficient',
    'th-alt': 'Altitude', 'th-mv': 'Max Vacuum', 'alt0': '0 m (Sea Level)', 'altmx': 'Mexico City (2,240m)',
    'tp-alt': '※ For high-altitude customers, always apply corrected values',
    'l-dia-mm': 'Cup Diameter (mm)', 'l-dia-in': 'Cup Diameter (in)',
    'l-ca-mm': 'Major axis a (mm)', 'l-ca-in': 'Major axis a (in)',
    'l-cb-mm': 'Minor axis b (mm)', 'l-cb-in': 'Minor axis b (in)',
    'l-cw': 'Width W', 'l-ch': 'Height H',
    'l-mass': 'Workpiece Mass W',
    'l-av-ms': 'Acceleration a (m/s²)', 'l-av-ft': 'Acceleration a (ft/s²)',
    'tp-acc-ms': '※ 9.81 m/s² = 1G', 'tp-acc-ft': '※ 32.2 ft/s² = 1G',
    'l-sm': 'Workpiece Weight W', 'l-scdia': 'Cup Diameter',
    'l-fv-cm': 'Evacuation Volume', 'l-fv-in': 'Evacuation Volume',
    'l-fl-lm': 'Leak Flow Q_leak (L/min)', 'l-fl-sc': 'Leak Flow Q_leak (SCFM)',
    'tp-fl-lm': 'Porous workpiece: 0.1~1.0 L/min', 'tp-fl-sc': 'Porous workpiece: ~0.004–0.035 SCFM',
    'verdict-safe': 'Safe — Theoretical force exceeds required by', 'pct-margin': '% margin',
    'verdict-warn': 'Caution — Barely sufficient. Consider larger cups or more cups.',
    'verdict-fail': 'Insufficient —',
    'steps-area': '① Eff. area:', 'steps-thy': '② Theory force:', 'steps-mass': '③ Workpiece:', 'steps-sf': '④ Safety factor:', 'steps-mrg': '⑤ Margin:',
    'steps-per-cup': '/cup', 'steps-cups': 'pcs', 'steps-req-f': '① Required Force (F):', 'steps-req-a': '② Required Total Area (A):', 'steps-req-d': '③ Min Required Diameter:', 'steps-req-q': '③ Min Required Quantity:',
    'tbl-ok': 'OK', 'tbl-warn': 'Marginal', 'tbl-fail': 'Insufficient',
    'ej-ok': 'Available', 'ej-no': 'Insufficient',
    'mode-tip-h': 'Horizontal: Cup faces up, lifting in gravity direction',
    'mode-tip-v': 'Vertical: Cup faces sideways, gravity perpendicular to movement',
    'mode-tip-t': 'Inclined: Combined vertical+horizontal movement. Highest safety factor needed',
    'upill-metric': 'SI · mm / kg / kPa / N', 'upill-imperial': 'US · in / lb / PSI / lbf',
    'tab-tcbm': 'CBM Calc',
    't6h': 'CBM Calculator', 't6s': 'Enter box/pallet dimensions to calculate CBM and estimate ocean/air freight costs.',
    'cbm-c1h': '① Cargo List', 'cbm-c2h': '② Freight Rate Settings', 'cbm-c3h': 'Results', 'cbm-c4h': 'Container Utilization', 'cbm-c5h': 'Freight Estimate (Reference)', 'cbm-c6h': 'Item Detail',
    'cbm-unit-lbl': 'Dimension Unit', 'cbm-add-btn': '＋ Add Item',
    'cbm-ocean-lbl': 'Ocean Freight (USD/CBM)', 'cbm-air-lbl': 'Air Freight (USD/kg)', 'cbm-chw-lbl': 'Air Volume Weight Factor (cm³/kg)',
    'cbm-rl-totalcbm': 'Total CBM', 'cbm-rl-totalw': 'Total Weight', 'cbm-rl-totalv': 'Total Volume (cm³)', 'cbm-rl-items': 'Items / Boxes',
    'th-cont': 'Container', 'th-cap': 'Capacity (CBM)', 'th-util': 'Utilization', 'th-qty': 'Qty Fit',
    'cbm-rl-ocean': 'Ocean Freight', 'cbm-rl-air': 'Air Freight', 'cbm-rl-chw': 'Chargeable Weight',
    'cbm-u-ocean': 'USD (CBM basis)', 'cbm-u-air': 'USD (Chargeable Wt.)',
    'th-item': '#', 'th-idesc': 'Item Name', 'th-idim': 'Dimensions (L×W×H)', 'th-iqty': 'Qty', 'th-iw': 'Weight(kg)', 'th-icbm': 'CBM',
    'cbm-tp-disc': '※ Freight estimates are for reference only. Actual rates vary by origin/destination, season, and forwarder agreement.',
    'cbm-info': '<strong>CBM (Cubic Meter)</strong> = Length(m) × Width(m) × Height(m)<br>Ocean freight uses actual CBM. Air freight uses the greater of actual weight vs. volumetric weight.',
    'cbm-lbl-item': 'ITEM', 'cbm-lbl-name': 'Item Name', 'cbm-lbl-l': 'Length L', 'cbm-lbl-w': 'Width W', 'cbm-lbl-h': 'Height H', 'cbm-lbl-qty': 'Qty', 'cbm-lbl-wt': 'Weight (kg/box)', 'cbm-lbl-del': 'Del',
    'cbm-ph-name': 'e.g. VMECA Suction Cup Box',
    'tt5n': 'M (Metric)', 'cbm-chw-o1': '6,000 (IATA International)', 'cbm-chw-o2': '5,000 (General Air Freight)', 'cbm-chw-o3': '4,000 (Express Air Freight)',
    // Engineering Tab
    'tab-teng': 'Engineering',
    't7h': 'Engineering Tools', 't7s': 'Performs additional engineering calculations for vacuum system design.',
    'eh-hd': '① Hose Distribution', 'el-hd-main': 'Main Pipe Size', 'el-hd-sub': 'Sub Hose Size',
    'er-hd-lbl': 'Rec. Branch Hose ID', 'etp-hd': '※ Optimal size based on Continuity Equation (Area Summation)',
    'eh-hd-form-lbl': 'Formula:', 'eh-hd-rec-ttl': 'Practical Rec. Sizes (Main 12mm ref.)',
    'eh-hd-rec-i1': '• 2-branch: 8~9 mm', 'eh-hd-rec-i2': '• 4-branch: 6 mm', 'eh-hd-rec-i3': '• 6~8 branch: 4 mm',
    'eh-of': '② Orifice Flow', 'el-of-dia': 'Orifice Diameter', 'el-of-vac': 'Vacuum Pressure',
    'er-of-lbl': 'Est. Leak Flow', 'etp-of': '※ Approximate air ingress when vacuum is maintained in system',
    'eh-of-guide-ttl': 'What is Orifice Flow? (Leakage)',
    'eh-of-guide-desc': 'A metric identifying air ingress through cracks or porous workpieces to assist practical system design.',
    'eh-of-guide-form': '<strong>Formula:</strong> Q ≈ 0.12 × D² × √P',
    'eh-of-guide-usage': '• <strong>Ejector Selection:</strong> Add leak flow (Q_leak) to required flow during design.<br>• <strong>Optimization:</strong> Reducing leakage is more economical than increasing ejector size.',
    'eh-hdia': '③ Recommended Hose Diameter', 'el-hdia-base': 'Basis', 'btn-hdb-drop': 'Press. Drop', 'btn-hdb-velo': 'Velocity',
    'el-hdia-flow': 'Volume Flow', 'el-hdia-len': 'Hose Length', 'el-hdia-velo': 'Velocity', 'el-hdia-pwork': 'Gauge Pressure', 'el-hdia-drop': 'Allowable Press. Drop',
    'el-hdia-drop': 'Allowable Press. Drop', 'er-hdia-lbl': 'Min Recommended ID', 'etp-hdia': '※ Based on Darcy-Weisbach / empirical formula for laminar approximation',
    'eh-hdia-guide-ttl': 'Hose Design & Pressure Drop Guide',
    'eh-hdia-guide-theory': '<strong style="color:var(--accent2);">[Base Theory: Darcy-Weisbach]</strong><br>Pressure drop (ΔP) is proportional to v² and L, and inversely proportional to D⁵.<br>Small increase in <strong>internal diameter significantly reduces pressure loss.</strong>',
    'eh-hdia-guide-vac': '<strong style="color:var(--accent2);">1. Vacuum Side Design</strong><br>• <strong>Feature:</strong> Low density leads to air expansion and rapid velocity increase.<br>• <strong>Target v:</strong> 15~20m/s (10m/s for faster response)<br>• <strong>Allowable Drop:</strong> Within 3~5% of target vacuum (approx. 3~5kPa)<br>• <strong>Pro Tip:</strong> Use 1.5~2.0x safety factor over theoretical values.',
    'eh-hdia-guide-air': '<strong style="color:var(--accent2);">2. Compressed Air Side Design</strong><br>• <strong>Feature:</strong> High density causes high friction, directly impacting performance.<br>• <strong>Target v:</strong> Below 10~15m/s<br>• <strong>Allowable Drop:</strong> Within 5% of supply pressure (approx. 0.1~0.3bar)<br>• <strong>Pro Tip:</strong> Base design on total consumption when all ejectors fire.',
    'eh-hdia-guide-table': '<strong style="color:var(--accent2);">[Practical Air Hose Selection (10m basis)]</strong><br>• ~100 L/min: ID 4~5mm (6π)<br>• 100~300 L/min: ID 6~8mm (8π/10π)<br>• 300~600 L/min: ID 10~12mm (12π/14π)',
    'eh-hdia-guide-tip': '💡 <strong>Expert Tip:</strong> Elbows and fittings have <strong>\'equivalent lengths\'</strong> many times longer than straight lines. Always size up for complex paths.',
    'eh-alt': '④ Altitude Pressure', 'el-alt-h': 'Altitude ASL (ft)', 'el-alt-u': 'Vacuum Pressure Unit', 'er-alt-lbl': 'Ambient Press. (Abs)',
    'etp-alt': '※ Max vacuum of ejectors cannot exceed this ambient pressure at high altitudes. During low-pressure weather, it drops ~5% further.',
    'l-fl-mode': 'Calc Mode', 'fl-m-flow': 'Req. Flow Calc', 'fl-m-time': 'Evac. Time Calc', 'l-fe': 'Pump/Ejector Flow (SCFM)',
    'el-hd-dir': 'Calc Direction', 'btn-hd-m2s': 'Main → Sub', 'btn-hd-s2m': 'Sub → Main', 'el-hd-qty': 'Sub Hose Quantity (pcs)',
    'er-hd-lbl2': 'Rec. Main Pipe ID', 'el-hdia-type': 'Line Type', 'btn-hdia-vac': 'Vacuum', 'btn-hdia-air': 'Compressed Air',
    'el-hdia-pwork': 'Working Pressure', 'er-alt-wv': 'Max Vacuum in Bad Weather',
    // ROI Tab
    'tab-troi': 'ROI Calc',
    't8h': 'Return on Investment (ROI) Calculator', 't8s': 'Calculate the estimated amortization period when introducing handling devices and automation systems.',
    'tbtn-roi-m': 'Manual Handling Device', 'tbtn-roi-a': 'Automation System',
    'rh-m1': '① Operations Info', 'rh-m2': 'Results',
    'rl-m-days': 'Working days per year (d/yr)', 'rl-m-hours': 'Working hours per day (h/d)',
    'rl-m-cost': 'Hourly labor cost ($/h)', 'rl-m-share': 'Labor cost share of wage (%)',
    'rl-m-hand': 'Handling time share (%)', 'rl-m-prod': 'Expected productivity increase (%)',
    'rl-m-sick': 'Expected sick leave reduction (d/yr)', 'rl-m-inv': 'Vacuum equipment investment ($)',
    'rtp-m-share': 'Percentage of wage representing pure labor cost (typically 80-100%)',
    'rtp-m-hand': 'Proportion of working hours actually spent handling items',
    'rr-m-time-lbl': 'Expected Amortization Period', 'ru-m-time': 'Months',
    'rr-m-save-lbl': 'Added Value from Productivity (Annual)', 'ru-m-save': '$ / year',
    'rr-m-sick-lbl': 'Savings from Reduced Sick Leave (Annual)', 'ru-m-sick': '$ / year',
    'rh-a1': '① Automation Requirements', 'rh-a2': 'Results',
    'rl-a-cost': 'Annual labor cost per worker ($)', 'rl-a-emp': 'Replaced personnel per shift',
    'rl-a-shift': 'Number of shifts per day', 'rtp-a-shift': 'e.g., 2 shifts, 3 shifts',
    'rl-a-inv': 'Automation system investment ($)',
    'rr-a-time-lbl': 'Expected Amortization Period', 'ru-a-time': 'Months',
    'rr-a-save-lbl': 'Total Labor Savings (Annual)', 'ru-a-save': '$ / year',
    'rt-m-sum-formula': 'Total Annual Savings = (Productivity Gain) + (Sick Leave Savings)',
    'rt-m-time-formula': 'Amortization (Months) = (Investment / Total Annual Savings) × 12',
    'rt-a-sum-formula': 'Total Savings = (Replaced Staff) × (Daily Shifts) × (Annual Labor Cost per Person)',
    'rt-a-time-formula': 'Amortization (Months) = (Investment / Total Savings) × 12',
  }
};

function t(key) { return T[lang][key] || T['ko'][key] || key; }

// ============================================================
// UTILITIES
// ============================================================
function e(id) { return document.getElementById(id); }
function setText(id, txt) { const el = e(id); if (el) el.textContent = txt; }
function isImp() { return unitSys === 'imperial'; }
function getKpa(sliderId) { return parseFloat(e(sliderId).value) * (90 / 29); }
function fmtV(n, d = 3) { return isNaN(n) || !isFinite(n) ? '—' : parseFloat(n.toFixed(d)).toString(); }

// Conversions (always store/compute in metric internally)
function inpLen(v) { return isImp() ? v * 25.4 : v; }        // input → mm
function dispLen(mm) { return isImp() ? mm / 25.4 : mm; }
function inpMass(v) { return isImp() ? v / 2.20462 : v; }    // input → kg
function inpAcc(v) { return isImp() ? v / 3.28084 : v; }     // ft/s²→m/s²
function inpVol(v) { return isImp() ? v * 16.3871 : v; }     // in³→cm³
function inpLeak(v) { return isImp() ? v / 0.0353147 : v; }  // SCFM→L/min
function dispForce(N) { return isImp() ? (N * 0.224809).toFixed(3) : N.toFixed(1); }
function dispArea(cm2) { return isImp() ? (cm2 * 0.155).toFixed(4) : cm2.toFixed(2); }
function dispLen2(mm) { return isImp() ? (mm / 25.4).toFixed(4) : mm.toFixed(1); }
function dispFlow(lmin) { return isImp() ? (lmin * 0.0353147).toFixed(4) : lmin.toFixed(2); }
function fu() { return isImp() ? 'lbf' : 'N'; }
function au() { return isImp() ? 'in²' : 'cm²'; }
function du() { return isImp() ? 'in' : 'mm'; }
function lmu() { return isImp() ? 'in' : 'mm'; }
function fmu2() { return isImp() ? 'SCFM' : 'L/min'; }

// TRANSLATION HELPER
function t(k) { return T[lang][k] || k; }

// ============================================================
// LANGUAGE SWITCH
// ============================================================
function setLang(l) {
  lang = l;
  e('l-ko').className = 'tgl-btn' + (l === 'ko' ? ' a-metric' : '');
  e('l-en').className = 'tgl-btn' + (l === 'en' ? ' a-metric' : '');
  applyTranslations();
  updateUnitLabels();
  setModeTip();
  doConv(); cF(); cS(); cFL();
  calcCbm();
  calcRoiM(); calcRoiA();
}

function applyTranslations() {
  // All translatable IDs — textContent
  const ids = [
    'hdr-sub',
    // Tabs
    't1h', 't1s', 't2h', 't2s', 't3h', 't3s', 't4h', 't4s', 't5h', 't6h', 't6s',
    // Card headers
    'c1h', 'c2h', 'c3h', 'c4h', 'c5h', 'c6h', 'c7h', 'c8h', 'c9h', 'c10h',
    'c11h', 'c12h', 'c13h', 'c14h', 'c15h', 'c16h', 'c17h', 'c18h', 'c19h', 'c19b', 'c4h-s',
    // Tab1 — Force
    'l-ctype', 'o-circle', 'o-oval', 'o-rect', 'l-dia', 'l-ca', 'l-cb', 'l-cw', 'l-ch', 'l-cnt', 'l-vac1', 'tp-vac1',
    'l-mode',
    'l-mu', 'mo1', 'mo2', 'mo3', 'mo4', 'mo5',
    'l-sf', 'tp-sf', 'l-acc', 'acc-n', 'acc-y',
    'l-mass', 'l-av', 'tp-acc',
    'rl-area', 'rl-thy', 'rl-req', 'rl-mrg', 'fb1n',
    // Tab2 — Cup Select
    'tbtn-tc-dia', 'tbtn-tc-qty', 'l-scdia', 'l-sm', 'l-sv', 'l-sn', 'l-sacc', 'tp-sacc', 'l-sav', 'rl-sqty', 'ru-sqty',
    'l-smode', 'so-h', 'so-v', 'l-smu', 'smo1', 'smo2', 'smo3',
    'l-ssf', 'ssf1', 'ssf2', 'ssf3', 'ssf4',
    'rl-sdia', 'rl-sf2', 'rl-sa', 'th-d', 'th-f', 'th-m', 'th-r', 's-tbl-ph',
    'sacc-y', 'sacc-n',
    // Tab3 — Flow
    'l-fv', 'tp-fv', 'l-fvac', 'l-ft', 'l-fn', 'l-f-sf', 'tp-f-sf',
    'l-f-hid', 'l-f-hlen',
    'rl-flow', 'rl-peak', 'rl-air', 'rl-rt', 'fb3n', 'c10h-f', 'tp-f-time',
    'c11h-f', 'f-gui-1', 'f-gui-2', 'f-gui-3', 'f-gui-4', 'f-gui-5',
    'th-em', 'th-ef', 'th-es', 'qref-ttl', 'qh-p', 'qh-l', 'qh-f', 'qh-m', 'qh-fl', 'qh-av',
    // Tab4 — Unit Converter
    'dir-mi', 'dir-im',
    'cvh-p', 'cvh-l', 'cvh-f', 'cvh-m', 'cvh-a', 'cvh-fl', 'cvh-v', 'cvh-t', 'cvt-tc', 'cvt-tf', 'tp-temp',
    // Tab5 — Reference: Safety/Friction
    'th-sv', 'th-sc', 'sr1', 'sr2', 'sr3', 'sr4', 'sr5',
    'th-mat', 'th-dry', 'th-wet', 'mr1', 'mr2', 'mr3', 'mr4', 'mr5', 'mr6',
    // Tab5 — Formulas
    'cas1', 'cas2', 'cas3', 'cf1', 'cf2',
    // Tab5 — Altitude
    'th-alt', 'th-mv', 'alt0', 'altmx', 'tp-alt',
    // Tab5 — Pressure conversion table (c15h already above)
    // Tab5 — Vacuum comparison table
    'tp-vac-tbl', 'th-vdesc', 'th-vapp',
    'vr1', 'vr2', 'vr3', 'vr4', 'vr5', 'vr6', 'vr7',
    'va1', 'va2', 'va3', 'va4', 'va5', 'va6', 'va7',
    // Tab5 — Positive pressure
    'tp-pos-tbl', 'th-pdesc', 'th-papp',
    'pr1', 'pr2', 'pr3', 'pr4', 'pr5', 'pr6',
    'pa1', 'pa2', 'pa3', 'pa4', 'pa5', 'pa6',
    // Tab5 — Flow rate
    'th-fapp', 'fr1', 'fr2', 'fr3', 'fr4', 'fr5', 'fr6', 'fr7',
    // Tab5 — Thread table
    'tp-thread',
    'th-tname', 'th-ttype', 'th-tregion', 'th-tangle', 'th-ttaper', 'th-tcompat', 'th-tnote',
    'tt1', 'tt2', 'tt3', 'tt4', 'tt5',
    'tr1a', 'tr2a', 'tr3a', 'tr4a', 'tr5a',
    'tn1', 'tn2', 'tn3', 'tn4', 'tn5',
    'tt1t', 'tt2t', 'tt3t', 'tt4t', 'tt5t',
    'th-tnominal', 'th-tptod', 'th-tpttpi', 'th-tnptod', 'th-tnpttpi', 'th-tflow',
    'tf1', 'tf2', 'tf3', 'tf4', 'tf5', 'tf6',
    // Tab5 — Thread compat boxes
    'compat-ok-hdr', 'compat-no-hdr',
    // Tab6 — CBM
    'cbm-c1h', 'cbm-c2h', 'cbm-c3h', 'cbm-c4h', 'cbm-c5h', 'cbm-c6h',
    'cbm-unit-lbl', 'cbm-add-btn', 'cbm-ocean-lbl', 'cbm-air-lbl', 'cbm-chw-lbl',
    'cbm-rl-totalcbm', 'cbm-rl-totalw', 'cbm-rl-totalv', 'cbm-rl-items',
    'th-cont', 'th-cap', 'th-util', 'th-qty',
    'cbm-rl-ocean', 'cbm-rl-air', 'cbm-rl-chw', 'cbm-u-ocean', 'cbm-u-air',
    'th-item', 'th-idesc', 'th-idim', 'th-iqty', 'th-iw', 'th-icbm', 'cbm-tp-disc',
    'tt5n', 'cbm-chw-o1', 'cbm-chw-o2', 'cbm-chw-o3',
    // Engineering Tab
    't7h', 't7s', 'eh-hd', 'el-hd-main', 'el-hd-sub', 'er-hd-lbl', 'etp-hd',
    'eh-of', 'el-of-dia', 'el-of-vac', 'er-of-lbl', 'etp-of',
    'eh-hdia', 'el-hdia-flow', 'el-hdia-len', 'el-hdia-drop', 'er-hdia-lbl', 'etp-hdia',
    'eh-alt', 'el-alt-h', 'el-alt-u', 'er-alt-lbl', 'etp-alt',
    'el-hdia-base', 'btn-hdb-drop', 'btn-hdb-velo', 'el-hdia-velo', 'el-hdia-pwork', 'el-hdia-drop',
    'eh-hdia-guide-ttl', 'eh-hdia-guide-theory', 'eh-hdia-guide-vac', 'eh-hdia-guide-air', 'eh-hdia-guide-table', 'eh-hdia-guide-tip',
    'l-fl-mode', 'fl-m-flow', 'fl-m-time', 'l-fe',
    'el-hd-dir', 'btn-hd-m2s', 'btn-hd-s2m', 'el-hd-qty', 'el-hdia-type', 'btn-hdia-vac', 'btn-hdia-air', 'el-hdia-pwork', 'er-alt-wv',
    'eh-hd-form-lbl', 'eh-hd-rec-ttl', 'eh-hd-rec-i1', 'eh-hd-rec-i2', 'eh-hd-rec-i3',
    'eh-of-guide-ttl', 'eh-of-guide-desc', 'eh-of-guide-form', 'eh-of-guide-usage',
    // Tab8 - ROI
    't8h', 't8s', 'tbtn-roi-m', 'tbtn-roi-a',
    'rh-m1', 'rh-m2', 'rl-m-days', 'rl-m-hours', 'rl-m-cost', 'rl-m-share', 'rl-m-hand', 'rl-m-prod', 'rl-m-sick', 'rl-m-inv',
    'rtp-m-share', 'rtp-m-hand', 'rr-m-time-lbl', 'ru-m-time', 'rr-m-save-lbl', 'ru-m-save', 'rr-m-sick-lbl', 'ru-m-sick',
    'rh-a1', 'rh-a2', 'rl-a-cost', 'rl-a-emp', 'rl-a-shift', 'rtp-a-shift', 'rl-a-inv', 'rr-a-time-lbl', 'ru-a-time', 'rr-a-save-lbl', 'ru-a-save',
    'rt-m-sum-formula', 'rt-m-time-formula', 'rt-a-sum-formula', 'rt-a-time-formula',
    // Settings Tab
    'tset-h', 'tset-sub', 'set-th-h', 'set-th-desc', 'set-lang-h', 'set-lang-desc', 'set-unit-h', 'set-unit-desc',
  ];
  // IDs that contain HTML markup — use innerHTML
  const htmlIds = new Set([
    'tc1', 'tc2', 'tc3', 'tc4', 'tc5', 'f-form-q', 'f-form-t',
    'compat-ok', 'compat-no',
    'cbm-info',
    'eh-of-guide-form', 'eh-of-guide-usage',
    'eh-hdia-guide-vac', 'eh-hdia-guide-air', 'eh-hdia-guide-tip',
    'rt-m-sum-formula', 'rt-m-time-formula', 'rt-a-sum-formula', 'rt-a-time-formula',
    'eh-hdia-guide-theory', 'eh-hdia-guide-table',
  ]);

  ids.forEach(id => {
    const v = t(id);
    if (!v || !e(id)) return;
    if (htmlIds.has(id)) e(id).innerHTML = v;
    else e(id).textContent = v;
  });
  // HTML-content ids
  htmlIds.forEach(id => {
    const v = t(id); if (v && e(id)) e(id).innerHTML = v;
  });

  // Mode buttons (element id differs from translation key)
  const modeMap = { 'm-h': 'mb-h', 'm-v': 'mb-v', 'm-t': 'mb-t' };
  Object.entries(modeMap).forEach(([elId, tkId]) => {
    const v = t(tkId); if (v && e(elId)) e(elId).textContent = v;
  });
  // Update tab buttons
  ['tf', 'tc', 'tfl', 'tcbm', 'teng', 'tv', 'tr', 'troi', 'tset'].forEach(id => {
    const btn = document.querySelector(`[data-id="${id}"]`);
    if (btn) btn.textContent = t('tab-' + id);
  });
  // Re-render CBM item labels (language-aware)
  renderCbmItems();
}

// ============================================================
// UNIT SWITCH
// ============================================================
function setUnit(u) {
  unitSys = u;
  const imp = u === 'imperial';
  e('u-metric').className = 'tgl-btn' + (imp ? '' : ' a-metric');
  e('u-imperial').className = 'tgl-btn' + (imp ? ' a-imperial' : '');
  e('upill').className = 'unit-pill ' + (imp ? 'imperial' : 'metric');
  e('upill').textContent = t(imp ? 'upill-imperial' : 'upill-metric');
  updateUnitLabels();
  updateSliderDisplays();
  cF(); cS(); cFL();
}

function updateUnitLabels() {
  const imp = isImp();
  // Tab1 dimension labels - Removed static structural labels (now controlled by selects)
  setText('l-av', t(imp ? 'l-av-ft' : 'l-av-ms'));
  setText('tp-acc', t(imp ? 'tp-acc-ft' : 'tp-acc-ms'));
  // Result units
  setText('ru-area', au());
  setText('ru-f1', fu()); setText('ru-f2', fu());
  // Tab2
  setText('l-sav', t(imp ? 'l-av-ft' : 'l-av-ms'));
  setText('tp-sacc', t(imp ? 'tp-acc-ft' : 'tp-acc-ms'));
  setText('ru-sd', du()); setText('ru-sf', fu()); setText('ru-sa', au());
  // Tab3
  setText('l-fv', t(imp ? 'l-fv-in' : 'l-fv-cm'));
  setText('l-fl', t(imp ? 'l-fl-sc' : 'l-fl-lm'));
  setText('tp-fl', t(imp ? 'tp-fl-sc' : 'tp-fl-lm'));
  setText('ru-flow', fmu2()); setText('ru-peak', fmu2());
  setText('ru-air', imp ? 'SCFM' : 'NL/min');

  // Tab 7 Engineering lengths - handled by updLang's ids loop
  setText('ru-hdia-val', du());
  setText('ru-of-val', fmu2());

  // range labels
  updateRangeLabels();
}

function updateRangeLabels() {
  const rs = [
    { rl: 'rl1', uId: 'vac1-u', tp: 'tp-vac1' },
    { rl: 'srl', uId: 's-vac-u', tp: 'tp-svac' },
    { rl: 'frl', uId: 'f-vac-u', tp: 'tp-fvac' }
  ];
  const factorMap = {
    kPa: 1, bar: 100, mbar: 0.1, Pa: 0.001, inHg: 3.38639, inH2O: 0.249089,
    mmHg: 0.133322, Torr: 0.133322, pct: 1.01325
  };
  const ko = document.documentElement.lang === 'ko';

  rs.forEach(item => {
    const uSelect = e(item.uId);
    if (!e(item.rl)) return;

    let u, cvt;
    if (uSelect) {
      u = uSelect.value;
      cvt = (kpa) => {
        let v;
        if (u === 'pct') v = kpa / 1.01325;
        else v = kpa / (factorMap[u] || 1);
        return v.toFixed(u === 'kPa' ? 0 : 2) + ' ' + (u === 'pct' ? '%' : u);
      };
    } else {
      u = isImp() ? 'PSI' : 'kPa';
      cvt = (kpa) => {
        let v = isImp() ? kpa * 0.14504 : kpa;
        return v.toFixed(isImp() ? 2 : 0) + ' ' + u;
      };
    }

    const spans = e(item.rl).querySelectorAll('span');
    if (spans.length === 3) {
      spans[0].textContent = cvt(-10);
      spans[1].textContent = cvt(-50);
      spans[2].textContent = cvt(-90);
    }

    if (item.tp && e(item.tp)) {
      if (ko) e(item.tp).textContent = `※ 대기압 기준 게이지압. 일반 이젝터: ${cvt(-60)} ~ ${cvt(-80)}`;
      else e(item.tp).textContent = `※ Gauge pressure. Typical ejector: ${cvt(-60)} to ${cvt(-80)}`;
    }
  });
}

function updateSliderDisplays() {
  syncVacSld('vac1', 'vd1-inp');
  syncVacSld('s-vac', 'svd-inp');
  syncVacSld('f-vac', 'fvd-inp');
}

// ============================================================
// TAB SWITCH
// ============================================================
function swTab(id, btn) {
  document.querySelectorAll('.tp').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('#mtabs .tab').forEach(t => t.classList.remove('active'));
  e(id).classList.add('active');
  btn.classList.add('active');
}

// ============================================================
// VAC DISPLAYS
// ============================================================
function getUnitStr() { return isImp() ? 'PSI' : 'kPa'; }

function getDispVal(kpa) {
  return isImp() ? (kpa * 0.14504).toFixed(2) : (kpa).toFixed(0);
}

function syncVacSld(sId, iId) {
  const kpa = getKpa(sId);
  const uSelect = e(sId + '-u');
  let disp;

  if (uSelect) {
    const u = uSelect.value;
    const factorMap = {
      kPa: 1, bar: 100, mbar: 0.1, Pa: 0.001, inHg: 3.38639, inH2O: 0.249089,
      mmHg: 0.133322, Torr: 0.133322, pct: 1.01325
    };
    if (u === 'pct') disp = (kpa / 1.01325).toFixed(1);
    else disp = (kpa / (factorMap[u] || 1)).toFixed(u === 'kPa' ? 0 : 3);
  } else {
    disp = getDispVal(kpa);
  }

  if (e(iId)) e(iId).value = -disp;
  const dId = iId.replace('-inp', '-disp');
  if (e(dId + '-v')) e(dId + '-v').textContent = '-' + disp;
  if (e(dId + '-u')) e(dId + '-u').textContent = uSelect ? uSelect.value : getUnitStr();
}

function syncVacInp(sId, iId) {
  let val = e(iId).value;
  if (val && !val.toString().startsWith('-')) {
    e(iId).value = '-' + val;
  }

  let numVal = parseFloat(e(iId).value) || 0;
  const absVal = Math.abs(numVal);

  // Check for local unit selector (e.g., f-vac-u)
  const uSelect = e(sId + '-u');
  let kpa;
  if (uSelect) {
    const u = uSelect.value;
    const factorMap = {
      kPa: 1, bar: 100, mbar: 0.1, Pa: 0.001, inHg: 3.38639, inH2O: 0.249089,
      mmHg: 0.133322, Torr: 0.133322, pct: 1.01325
    };
    kpa = absVal * (factorMap[u] || 1);
  } else {
    kpa = isImp() ? absVal / 0.14504 : absVal;
  }

  let s = kpa * 29 / 90;
  if (s < 1) s = 1;
  if (s > 29) s = 29;
  if (e(sId)) e(sId).value = s.toFixed(4);

  const dId = iId.replace('-inp', '-disp');
  if (e(dId + '-v')) e(dId + '-v').textContent = (numVal < 0 ? '' : '-') + absVal;
  if (e(dId + '-u')) e(dId + '-u').textContent = uSelect ? uSelect.value : getUnitStr();
}

// ============================================================
// CUP TYPE
// ============================================================
function onCT() {
  const t = e('cup-type').value;
  e('d-circle').style.display = t === 'circle' ? '' : 'none';
  e('d-oval').style.display = t === 'oval' ? '' : 'none';
  e('d-rect').style.display = t === 'rect' ? '' : 'none';
  cF();
}

// ============================================================
// LIFT MODE / SAFETY FACTOR / ACCELERATION
// ============================================================
function setModeTip() {
  const tips = { 'horizontal': 'mode-tip-h', 'vertical': 'mode-tip-v', 'tilt': 'mode-tip-t' };
  setText('mode-tip', t(tips[liftMode]));
}
function setMode(m) {
  liftMode = m;
  ['h', 'v', 't'].forEach(x => e('m-' + x).classList.remove('active'));
  e('m-' + m[0]).classList.add('active');
  e('fmu').style.display = m !== 'horizontal' ? '' : 'none';
  setModeTip(); cF();
}
function setSF(v) {
  SF = v;
  const sfMap = { 1.5: 'sf-15', 2.0: 'sf-20', 2.5: 'sf-25', 4.0: 'sf-40' };
  Object.values(sfMap).forEach(id => { const el = e(id); if (el) el.classList.remove('active'); });
  const el = e(sfMap[v]); if (el) el.classList.add('active');
  cF();
}
function setAcc(v) {
  useAcc = v;
  e('acc-y').classList.toggle('active', v);
  e('acc-n').classList.toggle('active', !v);
  e('acc-fld').style.display = v ? '' : 'none';
  cF();
}

// ============================================================
// EFFECTIVE AREA (cm²)
// ============================================================
function getEA() {
  const tp = e('cup-type').value;
  if (tp === 'circle') {
    const r = parseFloat(e('cup-dia').value) || 0;
    const u = e('cup-dia-u').value;
    const mm = u === 'inch' ? r * 25.4 : r;
    return Math.PI * (mm / 2) * (mm / 2) / 100;
  } else if (tp === 'oval') {
    const aR = parseFloat(e('cup-a').value) || 0;
    const a = e('cup-a-u').value === 'inch' ? aR * 25.4 : aR;
    const bR = parseFloat(e('cup-b').value) || 0;
    const b = e('cup-b-u').value === 'inch' ? bR * 25.4 : bR;
    return Math.PI * (a / 2) * (b / 2) / 100;
  } else {
    const wR = parseFloat(e('cup-w').value) || 0;
    const w = e('cup-w-u').value === 'inch' ? wR * 25.4 : wR;
    const hR = parseFloat(e('cup-h').value) || 0;
    const h = e('cup-h-u').value === 'inch' ? hR * 25.4 : hR;
    return w * h / 100;
  }
}

// ============================================================
// CALC FORCE (Tab1)
// ============================================================
function cF() {
  const area = getEA(), n = parseInt(e('cup-cnt').value) || 1;
  const P = getKpa('vac1');
  const wR = parseFloat(e('w-mass').value) || 0;
  const W_kg = e('w-mass-u').value === 'lb' ? wR * 0.453592 : wR;
  const a_ms = useAcc ? inpAcc(parseFloat(e('acc-v').value) || 0) : 0;
  const mu = parseFloat((e('mu-v') || { value: '0.5' }).value) || 0.5;
  const totalArea = area * n;
  const F_thy = P * totalArea * 0.1; // N

  let F_req;
  if (liftMode === 'horizontal') F_req = W_kg * (G + a_ms) * SF;
  else if (liftMode === 'vertical') F_req = SF * (Math.sqrt((W_kg * G / mu) ** 2 + (W_kg * a_ms) ** 2) || W_kg * G / mu);
  else F_req = SF * Math.sqrt((W_kg * G) ** 2 + (W_kg * a_ms / mu) ** 2);

  const margin = F_thy > 0 ? (F_thy - F_req) / F_req * 100 : 0;
  const pass = F_thy >= F_req;

  // Area & Force Display Formatting (Determined by Cup Input Unit)
  const tp = e('cup-type').value;
  let useImp = false;
  if (tp === 'circle') useImp = e('cup-dia-u').value === 'inch';
  else if (tp === 'oval') useImp = e('cup-a-u').value === 'inch';
  else useImp = e('cup-w-u').value === 'inch';

  e('r-area').textContent = useImp ? (totalArea * 0.155).toFixed(2) : totalArea.toFixed(2);
  const outForceThy = useImp ? F_thy * 0.224809 : F_thy;
  const outForceReq = useImp ? F_req * 0.224809 : F_req;
  e('r-thy').textContent = outForceThy.toFixed(1);
  e('r-req').textContent = outForceReq.toFixed(1);
  e('r-mrg').textContent = (margin > 0 ? '+' : '') + margin.toFixed(0);

  const au2 = useImp ? 'in²' : 'cm²';
  const fu2 = useImp ? 'lbf' : 'N';

  e('ru-area').textContent = au2; e('ru-f1').textContent = fu2; e('ru-f2').textContent = fu2;

  const vb = e('verdict');
  if (pass) {
    const cls = margin > 50 ? 'pass' : 'warn';
    const icon = cls === 'pass' ? '✅' : '⚠️';
    const msg = cls === 'pass'
      ? `${t('verdict-safe')} ${margin.toFixed(0)}${t('pct-margin')}`
      : t('verdict-warn');
    vb.innerHTML = `<div class="vrd ${cls}"><span>${icon}</span><span>${msg}</span></div>`;
  } else {
    vb.innerHTML = `<div class="vrd fail"><span>❌</span><span>${t('verdict-fail')} ${t('rl-thy')}(${outForceThy.toFixed(1)} ${fu2}) < ${t('rl-req')}(${outForceReq.toFixed(1)} ${fu2})</span></div>`;
  }

  // Formula
  e('fb2').innerHTML = `F<sub>required</sub> = ${outForceReq.toFixed(1)} ${fu2}`;

  // Steps
  const aOne = useImp ? (area * 0.155).toFixed(2) : area.toFixed(2);
  const aAll = useImp ? (totalArea * 0.155).toFixed(2) : totalArea.toFixed(2);
  const vU = e('vac1-u').value;
  const pStr = e('vd1-inp').value + ' ' + (vU === 'pct' ? '%' : vU);

  const massU = e('w-mass-u').value;
  const massDisp = massU === 'lb' ? `${parseFloat(e('w-mass').value) || 0} lb` : `${W_kg} kg`;
  const rawReq = F_req / SF;
  const rawReqDisp = useImp ? (rawReq * 0.224809).toFixed(1) + ' lbf' : rawReq.toFixed(1) + ' N';
  const accDisp = massU === 'lb' ? `(1G + ${(a_ms / G).toFixed(2)}G)` : `${(G + a_ms).toFixed(2)} m/s²`;

  const steps = `
    <span style="color:var(--text-muted)">${t('steps-area')}</span> <span style="color:var(--accent2)">${aOne} ${au2}${t('steps-per-cup')}</span> × ${n}${t('steps-cups')} = <span style="color:var(--accent2)">${aAll} ${au2}</span><br>
    <span style="color:var(--text-muted)">${t('steps-thy')}</span> ${pStr} × ${aAll} ${au2} = <span style="color:var(--accent2)">${outForceThy.toFixed(1)} ${fu2}</span><br>
    <span style="color:var(--text-muted)">${t('steps-mass')}</span> ${massDisp} × ${accDisp} ≈ <span style="color:var(--warning)">${rawReqDisp}</span><br>
    <span style="color:var(--text-muted)">${t('steps-sf')}</span> × S ${SF} = <span style="color:var(--warning)">${outForceReq.toFixed(1)} ${fu2}</span><br>
    <span style="color:var(--text-muted)">${t('steps-mrg')}</span> <span style="${pass ? 'color:var(--success)' : 'color:var(--danger)'}">${(margin > 0 ? '+' : '') + margin.toFixed(1)}%</span>`;
  e('calc-steps').innerHTML = steps;
  updateRangeLabels();
}

// ============================================================
// CALC SIZE / QTY (Tab2)
// ============================================================
function setCupMode(m, btn) {
  sCupMode = m;
  e('tbtn-tc-dia').classList.remove('active');
  e('tbtn-tc-qty').classList.remove('active');
  btn.classList.add('active');

  e('sc-cnt-fld').style.display = m === 'dia' ? '' : 'none';
  e('sc-dia-fld').style.display = m === 'qty' ? '' : 'none';

  e('sr-dia-wrap').style.display = m === 'dia' ? '' : 'none';
  e('sr-qty-wrap').style.display = m === 'qty' ? '' : 'none';

  e('s-tbl-card').style.display = m === 'dia' ? '' : 'none';

  cS();
}

function setSAcc(v) {
  sUseAcc = v;
  e('sacc-y').classList.toggle('active', v);
  e('sacc-n').classList.toggle('active', !v);
  e('sacc-fld').style.display = v ? '' : 'none';
  cS();
}

function cS() {
  const wR = parseFloat(e('s-mass').value) || 10;
  const massU = e('s-mass-u').value;
  const W_kg = massU === 'lb' ? wR * 0.453592 : wR;
  const P = getKpa('s-vac');
  const S = parseFloat(e('s-sf').value) || 2.0;
  const mode = e('s-mode').value;
  const mu = parseFloat(e('s-mu').value) || 0.5;
  const a_ms = sUseAcc ? inpAcc(parseFloat(e('s-acc-v').value) || 0) : 0;

  e('smu-fld').style.display = mode === 'vertical' ? '' : 'none';

  let F_req;
  if (mode === 'horizontal') F_req = W_kg * (G + a_ms) * S;
  else if (mode === 'vertical') F_req = S * (Math.sqrt((W_kg * G / mu) ** 2 + (W_kg * a_ms) ** 2) || W_kg * G / mu);
  else F_req = S * Math.sqrt((W_kg * G) ** 2 + (W_kg * a_ms / mu) ** 2);

  e('r-sf').textContent = massU === 'lb' ? (F_req * 0.224809).toFixed(2) : F_req.toFixed(1);
  const totalA_cm2 = F_req / (P * 0.1);
  e('r-sa').textContent = massU === 'lb' ? (totalA_cm2 * 0.155).toFixed(2) : totalA_cm2.toFixed(2);

  // set unit labels based on user mass selection
  e('ru-sf').textContent = massU === 'lb' ? 'lbf' : 'N';
  e('ru-sa').textContent = massU === 'lb' ? 'in²' : 'cm²';
  e('ru-sd').textContent = massU === 'lb' ? 'inch' : 'mm';

  if (sCupMode === 'dia') {
    const n = parseInt(e('s-cnt').value) || 1;
    const F_per = F_req / n;
    const A_cm2 = F_per / (P * 0.1);
    const d_mm = 2 * Math.sqrt(A_cm2 / Math.PI) * 10;

    e('r-sdia').textContent = massU === 'lb' ? (d_mm / 25.4).toFixed(3) : d_mm.toFixed(1);

    const std = [10, 15, 20, 25, 30, 40, 50, 63, 80, 100, 125];
    let html = '';
    std.forEach(d => {
      const Ac = Math.PI * (d / 2 / 10) ** 2, Fc = P * Ac * n * 0.1;
      const mg = (Fc - F_req) / F_req * 100, pass = Fc >= F_req;
      const dD = massU === 'lb' ? `∅${(d / 25.4).toFixed(3)} in` : `∅${d} mm`;
      const fD = massU === 'lb' ? `${(Fc * 0.224809).toFixed(2)} lbf` : `${Fc.toFixed(1)} N`;
      const badge = pass ? (mg > 50 ? `<span class="bdg bdg-ok">${t('tbl-ok')}</span>` : `<span class="bdg bdg-warn">${t('tbl-warn')}</span>`) : `<span class="bdg bdg-no">${t('tbl-fail')}</span>`;
      html += `<tr><td class="num">${dD}</td><td>${fD}</td><td style="${pass ? 'color:var(--success)' : 'color:var(--danger)'}">${mg > 0 ? '+' : ''}${mg.toFixed(0)}%</td><td>${badge}</td></tr>`;
    });
    e('s-tbl').innerHTML = html;
  } else {
    const dR = parseFloat(e('s-cdia').value) || 40;
    const diam_mm = e('s-cdia-u').value === 'inch' ? dR * 25.4 : dR;
    const A_cm2 = Math.PI * (diam_mm / 2 / 10) ** 2;
    const F_per_cup = P * A_cm2 * 0.1;
    const q_Req = F_per_cup > 0 ? F_req / F_per_cup : 0;
    const qtyCount = Math.ceil(q_Req);

    e('r-sqty').textContent = qtyCount;
  }

  // Detailed Steps for Tab 2
  const au2 = massU === 'lb' ? 'in²' : 'cm²';
  const fu2 = massU === 'lb' ? 'lbf' : 'N';
  const massVal = parseFloat(e('s-mass').value) || 10;
  const massDisp = massU === 'lb' ? `${massVal} lb` : `${W_kg} kg`;
  const P_disp = massU === 'lb' ? `${(P * 0.14504).toFixed(2)} PSI` : `${P.toFixed(0)} kPa`;

  let steps = `<span style="color:var(--text-muted)">${t('steps-req-f')}</span> ${massDisp} × ${(G + a_ms).toFixed(2)} m/s² × S ${S} = <span style="color:var(--warning)">${massU === 'lb' ? (F_req * 0.224809).toFixed(2) : F_req.toFixed(1)} ${fu2}</span><br>`;
  steps += `<span style="color:var(--text-muted)">${t('steps-req-a')}</span> ${massU === 'lb' ? (F_req * 0.224809).toFixed(2) : F_req.toFixed(1)} ${fu2} / (${P_disp} × 0.1) = <span style="color:var(--accent2)">${massU === 'lb' ? (totalA_cm2 * 0.155).toFixed(2) : totalA_cm2.toFixed(2)} ${au2}</span><br>`;

  if (sCupMode === 'dia') {
    const n = parseInt(e('s-cnt').value) || 1;
    const A_per = totalA_cm2 / n;
    const d_val = 2 * Math.sqrt(A_per / Math.PI) * 10;
    steps += `<span style="color:var(--text-muted)">${t('steps-req-d')}</span> 2 × √(${massU === 'lb' ? (A_per * 0.155).toFixed(2) : A_per.toFixed(2)} ${au2} / ${n}${t('steps-cups')} / π) × 10 = <span style="color:var(--accent2)">${massU === 'lb' ? (d_val / 25.4).toFixed(3) : d_val.toFixed(1)} ${massU === 'lb' ? 'in' : 'mm'}</span>`;
  } else {
    const dR = parseFloat(e('s-cdia').value) || 40;
    const diam_mm = e('s-cdia-u').value === 'inch' ? dR * 25.4 : dR;
    const A_per = Math.PI * (diam_mm / 2 / 10) ** 2;
    const F_per = P * A_per * 0.1;
    steps += `<span style="color:var(--text-muted)">${t('steps-area')}</span> ${massU === 'lb' ? (A_per * 0.155).toFixed(2) : A_per.toFixed(2)} ${au2} ${t('steps-per-cup')}<br>`;
    steps += `<span style="color:var(--text-muted)">${t('steps-req-q')}</span> ${massU === 'lb' ? (F_req * 0.224809).toFixed(2) : F_req.toFixed(1)} ${fu2} / ${massU === 'lb' ? (F_per * 0.224809).toFixed(2) : F_per.toFixed(1)} ${fu2} = <span style="color:var(--accent2)">${(F_per > 0 ? F_req / F_per : 0).toFixed(2)} → ${Math.ceil(F_per > 0 ? F_req / F_per : 0)} ${t('steps-cups')}</span>`;
  }
  e('s-calc-steps').innerHTML = steps;
  updateRangeLabels();
}

// ============================================================
// CALC FLOW (Tab3)
// ============================================================
function cFL() {
  // Volume Unit Conversion (Base: cm3)
  const vRaw = parseFloat(e('f-vol').value) || 50;
  const vUnit = e('f-vol-u').value;
  const volMap = { cm3: 1, mm3: 0.001, m3: 1e6, l: 1000, gal: 3785.41, in3: 16.3871, ft3: 28316.8 };
  const V_cm3 = vRaw * (volMap[vUnit] || 1);

  // Pressure Unit Conversion (Base: kPa)
  const pRaw = parseFloat(e('fvd-inp').value) || -28;
  const pUnit = e('f-vac-u').value;
  const prMap = {
    kPa: 1, bar: 100, mbar: 0.1, Pa: 0.001, inHg: 3.38639, inH2O: 0.249089,
    mmHg: 0.133322, Torr: 0.133322, pct: 1.01325
  };
  const P = Math.abs(pRaw) * (prMap[pUnit] || 1);

  // Sync display label
  e('fvd-disp-u').textContent = pUnit;
  e('fvd-disp-v').textContent = pRaw;

  // Leak flow & safety factor
  const Qleak = inpLeak(parseFloat(e('f-leak').value) || 0);
  const n = parseInt(e('f-cups').value) || 1;
  const fSF = parseFloat(e('f-fsf').value) || 1.5;
  const P_atm = 101.3;

  // Hose Volume Calculation (V = PI * r^2 * L)
  const hIDRaw = parseFloat(e('f-hid').value) || 0;
  const hIDUnit = e('f-hid-u').value;
  const hID_mm = hIDUnit === 'inch' ? hIDRaw * 25.4 : hIDRaw;

  const hLenRaw = parseFloat(e('f-hlen').value) || 0;
  const hLenUnit = e('f-hlen-u').value;
  let hLen_cm = 0;
  if (hLenUnit === 'mm') hLen_cm = hLenRaw / 10;
  else if (hLenUnit === 'inch') hLen_cm = hLenRaw * 2.54;
  else if (hLenUnit === 'ft') hLen_cm = hLenRaw * 30.48;
  else hLen_cm = hLenRaw * 100; // 'm' default

  const V_line_cm3 = Math.PI * Math.pow(hID_mm / 20, 2) * hLen_cm;

  // Total system volume per cup set
  const V_total_one = V_cm3 + V_line_cm3;
  const V_total_all = V_total_one * n;

  let calc_t2 = 0;
  let Q_avg_lmin = 0;

  if (flMode === 'flow') {
    const t2 = parseFloat(e('f-time').value) || 0.5;
    // Q_avg = (V_total * Ratio) / t2 (Apply SF later for selection, but theoretical here)
    const Q_avg_cm3s = V_total_all * (P / P_atm) / t2;
    Q_avg_lmin = Q_avg_cm3s * 0.06;
    calc_t2 = t2;
  } else {
    const ejFlowVal = parseFloat(e('f-ejq').value) || 20;
    const ejFlowLmin = isImp() ? ejFlowVal / 0.0353147 : ejFlowVal;
    const effective_flow = Math.max(0.1, ejFlowLmin);
    const Q_cm3s = effective_flow / 0.06;
    // Theoretical t = (V * Ratio) / Q
    // Actual t = Theoretical t * fSF (Pump non-linearity)
    calc_t2 = ((V_total_all * (P / P_atm)) / Q_cm3s) * fSF;
    Q_avg_lmin = effective_flow;
  }

  // Q_evac_req = Q_avg_lmin * fSF (Apply Safety Factor to the evacuation flow)
  const Q_evac_req = Q_avg_lmin * fSF;
  // Q_tot = Q_evac_req + (Q_leak * n)
  const Q_tot_final = Q_evac_req + Qleak * n;

  // Recommended Selection Flow (In this case, Q_tot_final is already safe for selection)
  const Q_sel = Q_tot_final;
  const Q_air = Q_sel * 3; // Consumption rule of thumb

  e('r-flow').textContent = isImp() ? dispFlow(Q_evac_req) : Q_evac_req.toFixed(2);
  e('r-peak').textContent = isImp() ? dispFlow(Q_tot_final) : Q_tot_final.toFixed(2);
  e('r-air').textContent = isImp() ? dispFlow(Q_air) : Q_air.toFixed(1);
  e('r-rt').textContent = calc_t2.toFixed(3);

  // Detailed Calculation Steps
  let st = '';
  const ko = lang === 'ko';
  const vU = e('f-vol-u').value;
  const pU = e('f-vac-u').value;

  st += `<div style="color:var(--accent); font-weight:600; margin-bottom:4px;">[${ko ? '시스템 전체 체적 산출' : 'Total System Volume'}]</div>`;
  st += `1. ${ko ? '개별 용기 체적' : 'Work Volume'}: ${vRaw} ${vU} → ${V_cm3.toFixed(2)} cm³<br>`;
  st += `2. ${ko ? '배관 체적' : 'Hose Volume'}: π × (${hID_mm.toFixed(1)}/20)² × ${hLen_cm.toFixed(1)} cm = ${V_line_cm3.toFixed(2)} cm³<br>`;
  st += `3. ${ko ? '합계 체적' : 'Total Volume'} (V<sub>total</sub>): (${V_cm3.toFixed(1)} + ${V_line_cm3.toFixed(1)}) × ${n} = <span style="color:var(--accent2)">${V_total_all.toFixed(1)} cm³</span><br>`;
  st += `<div style="border-top:1px dashed var(--border); margin:8px 0;"></div>`;

  if (flMode === 'flow') {
    st += `<div style="color:var(--accent); font-weight:600; margin-bottom:4px;">[${ko ? '평균 필요 유량 계산' : 'Avg. Flow Calculation'}]</div>`;
    st += `4. ${ko ? '목표 진공도 비율' : 'Vacuum Ratio'}: |${pRaw}| ${pU} / 101.3 kPa ≈ ${(P / 101.3).toFixed(4)}<br>`;
    st += `5. Q<sub>avg</sub> = (V<sub>total</sub> × Ratio) / t<br>`;
    st += `&nbsp;&nbsp;= (${V_total_all.toFixed(1)} × ${(P / 101.3).toFixed(4)}) / ${calc_t2} sec<br>`;
    st += `&nbsp;&nbsp;= ${(V_total_all * (P / 101.3) / calc_t2).toFixed(2)} cm³/sec<br>`;
    st += `&nbsp;&nbsp;≈ ${Q_avg_lmin.toFixed(2)} L/min<br>`;
  } else {
    st += `<div style="color:var(--accent); font-weight:600; margin-bottom:4px;">[${ko ? '도달 시간 계산 (안전율 포함)' : 'Response Time (incl. S.F.)'}]</div>`;
    st += `4. ${ko ? '펌프 유량' : 'Pump Flow'}: ${Q_avg_lmin.toFixed(2)} L/min → ${(Q_avg_lmin / 0.06).toFixed(2)} cm³/sec<br>`;
    st += `5. t<sub>actual</sub> = [(V<sub>total</sub> × Ratio) / Q<sub>pump</sub>] × S.F.<br>`;
    st += `&nbsp;&nbsp;= [(${V_total_all.toFixed(1)} × ${(P / 101.3).toFixed(4)}) / ${(Q_avg_lmin / 0.06).toFixed(1)}] × ${fSF}<br>`;
    st += `&nbsp;&nbsp;= <span style="color:var(--accent2); font-weight:700;">${calc_t2.toFixed(3)} sec</span><br>`;
  }

  st += `<div style="border-top:1px dashed var(--border); margin:8px 0;"></div>`;
  st += `<div style="color:var(--warning); font-weight:600; margin-bottom:4px;">[${ko ? '실무 권장 사양 결정' : 'Recommended Specification'}]</div>`;
  st += `4. Q<sub>evac_req</sub> = Q<sub>avg</sub> × S.F.<br>`;
  st += `&nbsp;&nbsp;= ${Q_avg_lmin.toFixed(2)} × ${fSF} = ${Q_evac_req.toFixed(2)} L/min<br>`;
  st += `5. Q<sub>total</sub> = Q<sub>evac_req</sub> + (Q<sub>leak</sub> × n)<br>`;
  st += `&nbsp;&nbsp;= ${Q_evac_req.toFixed(2)} + (${Qleak.toFixed(2)} × ${n}) = <span style="color:var(--accent2); font-weight:700;">${Q_tot_final.toFixed(2)} L/min</span><br>`;

  if (isImp()) {
    st += `<br><span style="color:var(--imperial); font-size:11px;">* Imperial: ${dispFlow(Q_sel)} SCFM</span>`;
  }

  e('f-calc-steps').innerHTML = st;

  const ejs = [
    { m: 'VME-07', f: 3 }, { m: 'VME-10', f: 8 }, { m: 'VME-15', f: 15 }, { m: 'VME-20', f: 28 }, { m: 'VME-30', f: 55 }, { m: 'VML-07', f: 6 }, { m: 'VML-10', f: 16 }
  ];
  let html = '';
  ejs.forEach(ej => {
    // Suitability check against Q_sel (Safety margin included)
    const ok = ej.f >= Q_sel;
    const fD = isImp() ? `${dispFlow(ej.f)} SCFM` : `${ej.f} L/min`;
    html += `<tr><td class="num">${ej.m}</td><td>${fD}</td><td>${ok ? `<span class="bdg bdg-ok">${t('ej-ok')}</span>` : `<span class="bdg bdg-no">${t('ej-no')}</span>`}</td></tr>`;
  });
  e('e-tbl').innerHTML = html;
  updateRangeLabels();
}

// ============================================================
// TEMPERATURE CONVERSION (Tab4)
// ============================================================
function doConvTemp(from) {
  const tcEl = document.getElementById('cv-tc');
  const tfEl = document.getElementById('cv-tf');
  const tfOut = document.getElementById('cv-tf-out');
  const tcOut = document.getElementById('cv-tc-out');
  if (!tcEl || !tfEl || !tfOut || !tcOut) return;
  if (from === 'c') {
    const c = parseFloat(tcEl.value);
    if (!isNaN(c)) {
      const f = c * 9 / 5 + 32;
      tfOut.textContent = f.toFixed(2);
      tcOut.textContent = c.toFixed(2);
      tfEl.value = f.toFixed(2);
    }
  } else {
    const f = parseFloat(tfEl.value);
    if (!isNaN(f)) {
      const c = (f - 32) * 5 / 9;
      tcOut.textContent = c.toFixed(2);
      tfOut.textContent = f.toFixed(2);
      tcEl.value = c.toFixed(2);
    }
  }
}
function setTempPreset(c) {
  const tcEl = document.getElementById('cv-tc');
  if (tcEl) { tcEl.value = c; doConvTemp('c'); }
}


// ============================================================
// UNIT CONVERTER (Tab4)
// ============================================================
function setDir(d, btn) {
  resetV75('conv');
  convDir = d;
  if (btn) {
    document.querySelectorAll('.uc-tabs .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  } else {
    e('dir-mi').className = 'tab' + (d === 'mi' ? ' active' : '');
    e('dir-im').className = 'tab' + (d === 'im' ? ' active' : '');
  }
  updateConvLabels(); doConv();
}

function updateConvLabels() {
  const mi = convDir === 'mi';
  // Vacuum Pressure
  if (e('cvt-vp')) e('cvt-vp').textContent = mi ? '-kPa → -PSI / -inHg' : '-inHg → -kPa / -PSI';
  if (e('cvl-vpi')) e('cvl-vpi').textContent = mi ? '-kPa' : '-inHg';
  if (e('cvl-vpo1')) e('cvl-vpo1').textContent = mi ? '-PSI' : '-kPa';
  if (e('cvl-vpo2')) e('cvl-vpo2').textContent = mi ? '-inHg' : '-PSI';
  // Pressure
  e('cvt-p').textContent = mi ? 'kPa → PSI / inHg / bar' : 'PSI → kPa / inHg / bar';
  e('cvl-pi').textContent = mi ? 'kPa' : 'PSI';
  e('cvl-po1').textContent = mi ? 'PSI' : 'kPa';
  e('cvl-po2').textContent = 'inHg';
  // Length
  e('cvt-l').textContent = mi ? 'mm → inch / ft' : 'inch → mm / cm';
  e('cvl-li').textContent = mi ? 'mm' : 'inch';
  e('cvl-lo1').textContent = mi ? 'inch' : 'mm';
  e('cvl-lo2').textContent = mi ? 'ft' : 'cm';
  // Force
  e('cvt-f').textContent = mi ? 'N → lbf / kgf' : 'lbf → N / kgf';
  e('cvl-fi').textContent = mi ? 'N' : 'lbf';
  e('cvl-fo1').textContent = mi ? 'lbf' : 'N';
  // Mass
  e('cvt-m').textContent = mi ? 'kg → lb / oz' : 'lb → kg / g';
  e('cvl-mi2').textContent = mi ? 'kg' : 'lb';
  e('cvl-mo1').textContent = mi ? 'lb' : 'kg';
  e('cvl-mo2').textContent = mi ? 'oz' : 'g';
  // Area
  e('cvt-a').textContent = mi ? 'cm² → in²' : 'in² → cm²';
  e('cvl-ai').textContent = mi ? 'cm²' : 'in²';
  e('cvl-ao').textContent = mi ? 'in²' : 'cm²';
  // Flow
  e('cvt-fl').textContent = mi ? 'L/min → SCFM / m³/hr' : 'SCFM → L/min / m³/hr';
  e('cvl-fli').textContent = mi ? 'L/min' : 'SCFM';
  e('cvl-flo1').textContent = mi ? 'SCFM' : 'L/min';
  e('cvl-flo2').textContent = 'm³/hr';
  // Volume
  e('cvt-v').textContent = mi ? 'cm³ → in³' : 'in³ → cm³';
  e('cvl-vi').textContent = mi ? 'cm³' : 'in³';
  e('cvl-vo').textContent = mi ? 'in³' : 'cm³';
  // Temperature
  if (e('temp-c2f')) e('temp-c2f').style.display = mi ? 'block' : 'none';
  if (e('temp-f2c')) e('temp-f2c').style.display = mi ? 'none' : 'block';
}

function doConv() {
  const mi = convDir === 'mi';
  const set = (id, v, d = 4) => { const el = e(id); if (el) el.textContent = fmtV(v, d); };

  // Vacuum
  if (e('cv-vpi')) {
    const vp = parseFloat(e('cv-vpi').value) || 0;
    if (e('cv-vpo1')) {
      if (mi) { set('cv-vpo1', vp * 0.145038, 4); set('cv-vpo2', vp * 0.295301, 4); }
      else { set('cv-vpo1', vp * 3.38639, 4); set('cv-vpo2', vp * 0.491154, 4); }
    }
  }

  // Pressure
  const p = parseFloat(e('cv-pi').value) || 0;
  if (mi) { set('cv-po1', p * 0.145038, 4); set('cv-po2', p * 0.295301, 4); set('cv-po3', p * 0.01, 5); }
  else { set('cv-po1', p / 0.145038, 3); set('cv-po2', p * 2.03602, 4); set('cv-po3', p * 0.0689476, 4); }
  // Length
  const ln = parseFloat(e('cv-li').value) || 0;
  if (mi) { set('cv-lo1', ln / 25.4, 5); set('cv-lo2', ln / 304.8, 5); }
  else { set('cv-lo1', ln * 25.4, 3); set('cv-lo2', ln * 2.54, 4); }
  // Force
  const f = parseFloat(e('cv-fi').value) || 0;
  if (mi) { set('cv-fo1', f * 0.224809, 4); set('cv-fo2', f * 0.101972, 4); }
  else { set('cv-fo1', f * 4.44822, 4); set('cv-fo2', f * 0.453592, 4); }
  // Mass
  const m = parseFloat(e('cv-mi').value) || 0;
  if (mi) { set('cv-mo1', m * 2.20462, 4); set('cv-mo2', m * 35.274, 3); }
  else { set('cv-mo1', m * 0.453592, 5); set('cv-mo2', m * 453.592, 2); }
  // Area
  const a = parseFloat(e('cv-ai').value) || 0;
  set('cv-ao', mi ? a * 0.155 : a * 6.4516, 5);
  // Flow
  const fl = parseFloat(e('cv-fli').value) || 0;
  if (mi) { set('cv-flo1', fl * 0.0353147, 5); set('cv-flo2', fl * 0.06, 4); }
  else { set('cv-flo1', fl * 28.3168, 3); set('cv-flo2', fl * 1.69901, 4); }
  // Volume
  const vo = parseFloat(e('cv-vi').value) || 0;
  set('cv-vo', mi ? vo * 0.0610237 : vo * 16.3871, mi ? 5 : 3);
}

// ============================================================
// CBM CALCULATOR
// ============================================================
let cbmUnit = 'cm';  // cm | mm | in | ft
let cbmItems = [
  { name: '', l: 60, w: 40, h: 30, qty: 1, wt: 5 }
];

const CONTAINERS = [
  { name: "20' FCL", cbm: 25.5 },
  { name: "40' FCL", cbm: 55.0 },
  { name: "40' HQ", cbm: 68.0 },
  { name: "LCL (1)", cbm: 1.0 },
];

// Convert input dimension to cm based on current cbmUnit
function toCm(v) {
  const f = { 'cm': 1, 'mm': 0.1, 'in': 2.54, 'ft': 30.48 };
  return v * (f[cbmUnit] || 1);
}

function setCbmUnit(u) {
  cbmUnit = u;
  ['cm', 'mm', 'in', 'ft'].forEach(x => { const b = e('cbm-u-' + x); if (b) b.classList.remove('active'); });
  const btn = e('cbm-u-' + u); if (btn) btn.classList.add('active');
  calcCbm();
}

function addCbmItem() {
  cbmItems.push({ name: '', l: 60, w: 40, h: 30, qty: 1, wt: 5 });
  renderCbmItems();
  calcCbm();
}

function removeCbmItem(idx) {
  if (cbmItems.length <= 1) { alert(lang === 'ko' ? '최소 1개 품목이 필요합니다.' : 'At least 1 item is required.'); return; }
  cbmItems.splice(idx, 1);
  renderCbmItems();
  calcCbm();
}

function getCbmItemVal(idx, field) {
  const el = e('cbm-' + field + '-' + idx);
  return el ? el.value : '';
}

function updateCbmItem(idx, field, val) {
  if (field === 'name') cbmItems[idx].name = val;
  else cbmItems[idx][field] = parseFloat(val) || 0;
  calcCbm();
}

function renderCbmItems() {
  const container = e('cbm-items');
  if (!container) return;
  const u = cbmUnit;
  const uDisp = { 'cm': 'cm', 'mm': 'mm', 'in': 'in', 'ft': 'ft' }[u];
  let html = '';
  cbmItems.forEach((item, idx) => {
    html += `
    <div class="cbm-item">
      <div class="cbm-item-hdr">
        <span class="cbm-item-num">${t('cbm-lbl-item')} ${idx + 1}</span>
        <button class="cbm-item-del" onclick="removeCbmItem(${idx})">${t('cbm-lbl-del')}</button>
      </div>
      <div class="fld" style="margin-bottom:10px;">
        <label>${t('cbm-lbl-name')}</label>
        <input type="text" id="cbm-name-${idx}" value="${item.name}" placeholder="${t('cbm-ph-name')}"
          oninput="updateCbmItem(${idx},'name',this.value)" style="width:100%; padding:9px 12px;">
      </div>
      <div class="g4m" style="margin-bottom:10px;">
        <div class="fld" style="margin:0;">
          <label>${t('cbm-lbl-l')} (${uDisp})</label>
          <input type="number" id="cbm-l-${idx}" value="${item.l}" min="0" step="any"
            oninput="updateCbmItem(${idx},'l',this.value)">
        </div>
        <div class="fld" style="margin:0;">
          <label>${t('cbm-lbl-w')} (${uDisp})</label>
          <input type="number" id="cbm-w-${idx}" value="${item.w}" min="0" step="any"
            oninput="updateCbmItem(${idx},'w',this.value)">
        </div>
        <div class="fld" style="margin:0;">
          <label>${t('cbm-lbl-h')} (${uDisp})</label>
          <input type="number" id="cbm-h-${idx}" value="${item.h}" min="0" step="any"
            oninput="updateCbmItem(${idx},'h',this.value)">
        </div>
        <div class="fld" style="margin:0;">
          <label>${t('cbm-lbl-qty')}</label>
          <input type="number" id="cbm-qty-${idx}" value="${item.qty}" min="1" step="1"
            oninput="updateCbmItem(${idx},'qty',this.value)">
        </div>
      </div>
      <div class="fld" style="margin:0;">
        <label>${t('cbm-lbl-wt')} (kg)</label>
        <input type="number" id="cbm-wt-${idx}" value="${item.wt}" min="0" step="0.1"
          oninput="updateCbmItem(${idx},'wt',this.value)" style="max-width:180px;">
      </div>
    </div>`;
  });
  container.innerHTML = html;
}

function calcCbm() {
  // Read current input values into cbmItems
  cbmItems.forEach((item, idx) => {
    const ln = parseFloat((e('cbm-l-' + idx) || { value: item.l }).value) || 0;
    const wn = parseFloat((e('cbm-w-' + idx) || { value: item.w }).value) || 0;
    const hn = parseFloat((e('cbm-h-' + idx) || { value: item.h }).value) || 0;
    const qn = parseInt((e('cbm-qty-' + idx) || { value: item.qty }).value) || 1;
    const wtn = parseFloat((e('cbm-wt-' + idx) || { value: item.wt }).value) || 0;
    item.l = ln; item.w = wn; item.h = hn; item.qty = qn; item.wt = wtn;
  });

  let totalCbm = 0, totalWkg = 0, totalVcm3 = 0, totalBoxes = 0;
  let detailHtml = '';

  cbmItems.forEach((item, idx) => {
    const lcm = toCm(item.l), wcm = toCm(item.w), hcm = toCm(item.h);
    const vcm3 = lcm * wcm * hcm;
    const cbm = vcm3 / 1e6;  // cm³ → m³
    const itemCbm = cbm * item.qty;
    const itemWkg = item.wt * item.qty;
    const u = cbmUnit;
    const dimDisp = `${item.l}×${item.w}×${item.h} ${u}`;
    totalCbm += itemCbm;
    totalWkg += itemWkg;
    totalVcm3 += vcm3 * item.qty;
    totalBoxes += item.qty;

    const nameDisp = item.name || `${t('cbm-lbl-item')} ${idx + 1}`;
    detailHtml += `<tr>
      <td class="num">${idx + 1}</td>
      <td>${nameDisp}</td>
      <td style="font-family:'Rajdhani',sans-serif;color:var(--text-muted);">${dimDisp}</td>
      <td class="num">${item.qty}</td>
      <td class="num">${item.wt}</td>
      <td class="num" style="color:var(--accent2);">${itemCbm.toFixed(4)}</td>
    </tr>`;
  });

  // Update summary
  const numItems = cbmItems.length;
  setText('cbm-r-totalcbm', totalCbm.toFixed(4));
  setText('cbm-r-totalw', totalWkg.toFixed(2));
  setText('cbm-r-totalv', Math.round(totalVcm3).toLocaleString());
  setText('cbm-r-items', `${numItems} / ${totalBoxes}`);

  // Container utilization
  let contHtml = '';
  CONTAINERS.forEach(c => {
    const pct = totalCbm / c.cbm * 100;
    const fclasses = pct > 100 ? 'over' : pct > 85 ? 'warn' : '';
    const clsColor = pct > 100 ? 'color:var(--danger)' : pct > 85 ? 'color:var(--warning)' : 'color:var(--success)';
    const qtyFit = totalCbm > 0 ? Math.floor(c.cbm / totalCbm) : 0;
    const barW = Math.min(pct, 100);
    contHtml += `<tr>
      <td class="num">${c.name}</td>
      <td>${c.cbm.toFixed(1)}</td>
      <td>
        <div class="container-bar">
          <div class="container-fill ${fclasses}" style="width:${barW}%"></div>
          <span class="container-pct" style="${clsColor}">${pct.toFixed(1)}%</span>
        </div>
      </td>
      <td class="num">${qtyFit > 0 ? qtyFit : '—'}</td>
    </tr>`;
  });
  const contTbl = e('cbm-cont-tbl');
  if (contTbl) contTbl.innerHTML = contHtml;

  // Freight
  const oceanRate = parseFloat((e('cbm-ocean-rate') || { value: 50 }).value) || 50;
  const airRate = parseFloat((e('cbm-air-rate') || { value: 5 }).value) || 5;
  const chwFactor = parseFloat((e('cbm-chw') || { value: 5000 }).value) || 5000;

  const oceanCost = totalCbm * oceanRate;
  // Volumetric weight = totalVcm3 / chwFactor
  const volWkg = totalVcm3 / chwFactor;
  const chargeableWkg = Math.max(totalWkg, volWkg);
  const airCost = chargeableWkg * airRate;

  setText('cbm-r-ocean', '$' + oceanCost.toFixed(2));
  setText('cbm-r-air', '$' + airCost.toFixed(2));
  setText('cbm-r-chw', chargeableWkg.toFixed(2));

  const detailTbl = e('cbm-detail-tbl');
  if (detailTbl) detailTbl.innerHTML = detailHtml;
}

// ============================================================
// ENGINEERING CALCULATOR
// ============================================================
function setHdDir(d) {
  eHdDir = d; resetV75('dist');
  e('btn-hd-m2s').classList.toggle('active', d === 'm2s');
  e('btn-hd-s2m').classList.toggle('active', d === 's2m');
  e('fld-hd-main').style.display = d === 'm2s' ? '' : 'none';
  e('fld-hd-sub').style.display = d === 's2m' ? '' : 'none';
  e('fld-hd-qty').style.display = '';

  if (d === 'm2s') {
    e('er-hd-lbl').textContent = t('er-hd-lbl');
    e('ru-hd-val').textContent = e('e-hd-main-u').value;
  } else {
    e('er-hd-lbl').textContent = t('er-hd-lbl2');
    e('ru-hd-val').textContent = e('e-hd-sub-u').value;
  }
  cEng();
}

function setHdiaType(t_val) {
  eHdiaType = t_val; resetV75('hdia');
  e('btn-hdia-vac').classList.toggle('active', t_val === 'vac');
  e('btn-hdia-air').classList.toggle('active', t_val === 'air');
  // v7.3: Show pwork if Air (both Drop & Velo mode) or Vac (Drop mode)
  // Actually, for Vac Velo mode, we usually assume ambient. But let's show when Air is selected.
  e('fld-hdia-pwork').style.display = t_val === 'air' ? '' : 'none';

  // v7.2 Dynamic Drop Units
  const dSel = e('e-hdia-drop-u');
  const oldV = dSel.value;
  dSel.innerHTML = '';
  if (t_val === 'vac') {
    dSel.innerHTML = '<option value="kPa">kPa</option><option value="inHg">inHg</option>';
  } else {
    dSel.innerHTML = '<option value="bar">bar</option><option value="psi">psi</option><option value="kPa">kPa</option>';
  }
  // Restore value if still exists in new options
  if ([...dSel.options].some(o => o.value === oldV)) dSel.value = oldV;

  cEng();
}

function setHdb(base) {
  eHdb = base; resetV75('hdia');
  e('btn-hdb-drop').classList.toggle('active', base === 'drop');
  e('btn-hdb-velo').classList.toggle('active', base === 'velo');
  e('fld-hd-drop-grp').style.display = base === 'drop' ? '' : 'none';
  e('fld-hd-velo-grp').style.display = base === 'velo' ? '' : 'none';
  // v7.3: Update pwork visibility
  e('fld-hdia-pwork').style.display = eHdiaType === 'air' ? '' : 'none';
  cEng();
}

function cEng() {
  const imp = isImp();
  // 1. Hose Distribution
  const hdQty = parseFloat(e('e-hd-qty').value) || 1;
  const mU = e('e-hd-main-u').value;
  const sU = e('e-hd-sub-u').value;

  if (eHdDir === 'm2s') {
    let hdMain = parseFloat(e('e-hd-main').value) || 0;
    if (mU === 'inch') hdMain *= 25.4; // Internal mm
    const reqSubMm = (hdQty > 0) ? (hdMain / Math.sqrt(hdQty)) : 0;

    // Result unit same as Main unit? User: "계산이 환산되어 잘 되도록" -> Output follows input?
    // Let's make result unit follow current input unit for consistency in that row.
    let displaySub = reqSubMm;
    if (mU === 'inch') displaySub /= 25.4;
    e('er-hd-val').textContent = displaySub > 0 ? displaySub.toFixed(2) : '—';
    e('ru-hd-val').textContent = mU;
  } else {
    let hdSub = parseFloat(e('e-hd-sub').value) || 0;
    if (sU === 'inch') hdSub *= 25.4; // Internal mm
    const reqMainMm = hdSub * Math.sqrt(hdQty);

    let displayMain = reqMainMm;
    if (sU === 'inch') displayMain /= 25.4;
    e('er-hd-val').textContent = displayMain > 0 ? displayMain.toFixed(2) : '—';
    e('ru-hd-val').textContent = sU;
  }

  // 2. Orifice Flow
  const oDiaRaw = parseFloat(e('e-of-dia').value) || 0;
  const oDiaUnit = e('e-of-dia-u').value;
  const oDiaMm = oDiaUnit === 'inch' ? oDiaRaw * 25.4 : oDiaRaw;

  const oVacRaw = parseFloat(e('e-of-vac').value) || 0;
  const oVacUnit = e('e-of-vac-u').value;
  const prMap = {
    kPa: 1, bar: 100, mbar: 0.1, Pa: 0.001, inHg: 3.38639, inH2O: 0.249089,
    mmHg: 0.133322, Torr: 0.133322, pct: 1.01325
  };
  const oVacKpa = Math.abs(oVacRaw) * (prMap[oVacUnit] || 1);

  // Empirical approximation: Q(L/min) ≈ 0.12 * D(mm)^2 * sqrt(P(kPa))
  let oflowLmin = 0.12 * Math.pow(oDiaMm, 2) * Math.sqrt(oVacKpa);

  // Result unit follows diameter unit
  let displayFlow = oflowLmin;
  let resultUnit = 'L/min';
  if (oDiaUnit === 'inch') {
    displayFlow = oflowLmin * 0.0353147; // -> SCFM
    resultUnit = 'SCFM';
  }

  e('er-of-val').textContent = displayFlow > 0 ? displayFlow.toFixed(2) : '—';
  e('ru-of-val').textContent = resultUnit;

  // 3. Hose Diameter
  const hFlowVal = parseFloat(e('e-hdia-flow').value) || 0;
  const hFlowUnit = e('e-hdia-flow-u').value;
  const hFlow = hFlowUnit === 'scfm' ? hFlowVal / 0.0353147 : hFlowVal; // -> L/min

  const hLenVal = parseFloat(e('e-hdia-len').value) || 0;
  const hLenUnit = e('e-hdia-len-u').value;
  let hLen = hLenVal; // default m
  if (hLenUnit === 'cm') hLen = hLenVal / 100;
  else if (hLenUnit === 'mm') hLen = hLenVal / 1000;
  else if (hLenUnit === 'inch') hLen = hLenVal * 0.0254;
  else if (hLenUnit === 'ft') hLen = hLenVal * 0.3048;

  const hDropVal = parseFloat(e('e-hdia-drop').value) || 0;
  const hDropUnit = e('e-hdia-drop-u').value;
  let hDrop = hDropVal; // default kPa
  if (hDropUnit === 'bar') hDrop = hDropVal * 100;
  else if (hDropUnit === 'psi') hDrop = hDropVal * 6.89476;
  else if (hDropUnit === 'inHg') hDrop = hDropVal * 3.38639;

  const hPworkVal = parseFloat(e('e-hdia-pwork').value) || 1;
  const hPworkUnit = e('e-hdia-pwork-u').value;
  const hPwork = hPworkUnit === 'psi' ? hPworkVal * 0.0689476 : hPworkVal; // -> bar

  let recDia = 0; // mm
  if (hFlow > 0) {
    if (eHdb === 'drop') {
      if (hLen > 0 && hDrop > 0) {
        if (eHdiaType === 'vac') {
          recDia = 3 * Math.pow((Math.pow(hFlow, 1.85) * hLen / hDrop), 0.2);
        } else {
          const absP = hPwork + 1; // Absolute pressure in bar
          recDia = 2 * Math.pow((Math.pow(hFlow, 1.85) * hLen / (hDrop * absP)), 0.2);
        }
      }
    } else {
      // Velocity based calculation (Recommended for sales)
      const vVal = parseFloat(e('e-hdia-velo').value) || 11.8;
      const vUnit = e('e-hdia-velo-u').value;
      let vTarget = vVal; // default m/s
      if (vUnit === 'kmh') vTarget = vVal / 3.6;
      else if (vUnit === 'fts') vTarget = vVal * 0.3048;
      else if (vUnit === 'mph') vTarget = vVal * 0.44704;

      if (vTarget > 0) {
        if (eHdiaType === 'air') {
          // v7.3: Correct for actual volume at pressure
          // d = sqrt( Q_std / (0.0471 * v * (P_gauge + 1)) )
          const absP = hPwork + 1;
          recDia = Math.sqrt(hFlow / (0.0471 * vTarget * absP));
        } else {
          recDia = Math.sqrt(hFlow / (0.0471 * vTarget));
        }
      }
    }
  }
  const displayDia = imp ? recDia / 25.4 : recDia;
  e('er-hdia-val').textContent = displayDia > 0 ? Math.ceil(displayDia * 10) / 10 : '—';

  // 4. Altitude Pressure
  const altStr = parseFloat(e('e-alt-h').value) || 0;
  const alt = imp ? altStr / 3.28084 : altStr; // -> meters
  let atmP = 101.325 * Math.pow(1 - 2.25577e-5 * alt, 5.25588); // kPa

  const altUSel = e('e-alt-u');
  let displayAlt = atmP;
  let unitLabel = 'kPa';

  if (altUSel) {
    const u = altUSel.value;
    const factorMap = {
      kPa: 1, bar: 100, mbar: 0.1, psi: 6.89476, inHg: 3.38639,
      mmHg: 0.133322, Torr: 0.133322
    };
    displayAlt = atmP / (factorMap[u] || 1);
    unitLabel = u;
  } else {
    displayAlt = imp ? atmP * 0.145038 : atmP;
    unitLabel = imp ? 'PSI' : 'kPa';
  }

  e('er-alt-val').textContent = displayAlt > 0 ? displayAlt.toFixed(unitLabel === 'kPa' || unitLabel === 'mbar' || unitLabel === 'mmHg' || unitLabel === 'Torr' ? 0 : 2) : '—';
  const minLim = displayAlt * 0.95;
  e('er-alt-wv-val').textContent = minLim > 0 ? minLim.toFixed(unitLabel === 'kPa' || unitLabel === 'mbar' || unitLabel === 'mmHg' || unitLabel === 'Torr' ? 0 : 2) : '—';

  e('ru-alt-val').textContent = unitLabel;
  e('ru-alt-wv-val').textContent = unitLabel;
}

function setFlMode(mode) {
  flMode = mode; resetV75('flow');
  e('fl-m-flow').classList.toggle('active', mode === 'flow');
  e('fl-m-time').classList.toggle('active', mode === 'time');
  e('fld-ft').style.display = mode === 'flow' ? '' : 'none';
  e('fld-fe').style.display = mode === 'time' ? '' : 'none';
  cFL();
}

// ============================================================
// ROI CALCULATOR
// ============================================================
function swRoiTab(id, btn) {
  resetV75('roi');
  document.querySelectorAll('.roi-tp').forEach(p => p.style.display = 'none');
  document.querySelectorAll('#tbtn-roi-m, #tbtn-roi-a').forEach(t => t.classList.remove('active'));
  e(id).style.display = 'block';
  btn.classList.add('active');
  if (id === 'troi-m') calcRoiM();
  else calcRoiA();
}

function calcRoiM() {
  const days = parseFloat(e('r-m-days').value) || 0;
  const hours = parseFloat(e('r-m-hours').value) || 0;
  const cost = parseFloat((e('r-m-cost').value || '0').replace(/,/g, '')) || 0;
  const share = (parseFloat(e('r-m-share').value) || 0) / 100;
  const hand = (parseFloat(e('r-m-hand').value) || 0) / 100;
  const prod = (parseFloat(e('r-m-prod').value) || 0) / 100;
  const sick = parseFloat(e('r-m-sick').value) || 0;
  const inv = parseFloat((e('r-m-inv').value || '0').replace(/,/g, '')) || 0;

  // Added value from productivity (annual)
  // Annual wage = days * hours * cost
  // Productive time wage that can be improved = Annual wage * share * hand
  // Value improvement = Productive time wage * prod
  const annualWage = days * hours * cost;
  const valImprove = annualWage * share * hand * prod;

  // Savings from sick leave (sick days * hours per day * cost per hour * share)
  const sickSave = sick * hours * cost * share;

  const totalSave = valImprove + sickSave;

  let timeInMonths = 0;
  if (totalSave > 0) {
    timeInMonths = (inv / totalSave) * 12;
  }

  e('rr-m-time').textContent = timeInMonths > 0 ? timeInMonths.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : '—';
  e('rr-m-save').textContent = valImprove > 0 ? valImprove.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '—';
  e('rr-m-sick').textContent = sickSave > 0 ? sickSave.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '—';
}

function calcRoiA() {
  const cost = parseFloat((e('r-a-cost').value || '0').replace(/,/g, '')) || 0;
  const emp = parseFloat(e('r-a-emp').value) || 0;
  const shift = parseFloat(e('r-a-shift').value) || 0;
  const inv = parseFloat((e('r-a-inv').value || '0').replace(/,/g, '')) || 0;

  const totalSave = emp * shift * cost;

  let timeInMonths = 0;
  if (totalSave > 0) {
    timeInMonths = (inv / totalSave) * 12;
  }

  e('rr-a-time').textContent = timeInMonths > 0 ? timeInMonths.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : '—';
  e('rr-a-save').textContent = totalSave > 0 ? totalSave.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '—';
}

// ============================================================
// THEME
// ============================================================
function setTheme(mode) {
  const root = document.documentElement;
  if (mode === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
  e('th-dark').className = 'tgl-btn' + (mode === 'dark' ? ' a-metric' : '');
  e('th-light').className = 'tgl-btn' + (mode === 'light' ? ' a-metric' : '');
}

// ============================================================
// INIT
// ============================================================
// Default: light mode active
setTheme('light');
applyTranslations();
updateUnitLabels();
updateSliderDisplays();
setModeTip();
updateConvLabels();
cF(); cS(); cFL(); doConv();
renderCbmItems();
calcCbm();
calcRoiM(); calcRoiA();
cEng();


// v7.7 Global Reset Logic
function resetV75(scope) {
  if (scope === 'hdia') {
    if (e('e-hdia-flow')) e('e-hdia-flow').value = 100;
    if (e('e-hdia-len')) e('e-hdia-len').value = 2;
    if (e('e-hdia-drop')) e('e-hdia-drop').value = 5;
    if (e('e-hdia-velo')) e('e-hdia-velo').value = 11.8;
    if (e('e-hdia-pwork')) e('e-hdia-pwork').value = 6;
  } else if (scope === 'cup') {
    if (e('w-mass')) e('w-mass').value = 1;
    if (e('cup-cnt')) e('cup-cnt').value = 4;
    if (e('acc-v')) e('acc-v').value = 0;
    if (e('s-mass')) e('s-mass').value = 10;
    if (e('s-cnt')) e('s-cnt').value = 1;
  } else if (scope === 'flow') {
    if (e('f-vol')) e('f-vol').value = 50;
    if (e('f-time')) e('f-time').value = 0.5;
    if (e('f-ejq')) e('f-ejq').value = 20;
    if (e('f-cups')) e('f-cups').value = 1;
    if (e('f-leak')) e('f-leak').value = 0;
  } else if (scope === 'dist') {
    if (e('e-hd-main')) e('e-hd-main').value = 12;
    if (e('e-hd-sub')) e('e-hd-sub').value = 8;
    if (e('e-hd-qty')) e('e-hd-qty').value = 4;
  } else if (scope === 'roi') {
    if (e('r-m-inv')) e('r-m-inv').value = '10,000,000';
    if (e('r-a-inv')) e('r-a-inv').value = '150,000,000';
  } else if (scope === 'conv') {
    if (e('cv-vpi')) e('cv-vpi').value = -60;
    if (e('cv-pi')) e('cv-pi').value = 500;
  }

  // Auto-recalculate after reset
  if (scope === 'hdia' || scope === 'dist') cEng();
  else if (scope === 'cup') { cF(); cS(); }
  else if (scope === 'flow') cFL();
  else if (scope === 'roi') { calcRoiM(); calcRoiA(); }
  else if (scope === 'conv') doConv();
}

// ============================================================
// AUTO RESET INPUT ON UNIT CHANGE
// ============================================================
document.addEventListener('change', function (ev) {
  const t = ev.target;
  if (t.tagName === 'SELECT' && t.id.endsWith('-u')) {
    let inpId = t.id.slice(0, -2);
    // Overrides for special mappings
    const spec = {
      'vac1-u': 'vd1-inp',
      's-vac-u': 'svd-inp',
      'f-vac-u': 'fvd-inp',
      'e-alt-u': 'e-alt-h'
    };
    if (spec[t.id]) inpId = spec[t.id];

    const inp = document.getElementById(inpId);
    if (inp && inp.tagName === 'INPUT') {
      inp.value = '';
    }
  }
}, true); // Use capture phase

// ============================================================
// FORMAT NUMBER WITH COMMAS FOR ROI INPUTS
// ============================================================
function fmtNum(el) {
  let val = el.value.replace(/[^0-9.]/g, '');
  if (val !== '') {
    const parts = val.split('.');
    parts[0] = parseInt(parts[0] || '0', 10).toLocaleString('en-US');
    val = parts.join('.');
    el.value = val;
  } else {
    el.value = '';
  }
}
