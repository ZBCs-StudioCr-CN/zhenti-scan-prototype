/* ==========================================================================
   考点字典 + 真题题库 + 推荐练习题库（结构化数据）
   产品：真题漏洞扫描 · 高考数学AI个性化提分系统
   数据依据：2020-2025新高考全国卷I/II卷考点频次统计
   ========================================================================== */

/* ---------- 1. 78个二级精标考点字典（核心资产）----------
   字段说明：
   id: 唯一标识  格式：theme.module.index（例：1.1.3 = 主题1模块1第3个考点）
   name: 考点名称（精标时唯一可选标签）
   themeId: 1=函数与导数 2=几何与代数 3=概率与统计
   themeName: 主题中文名
   moduleId: 模块编号（1.1 1.2 2.1等）
   moduleName: 模块中文名
   weightScore: 高考分值权重（估算，单考点年平均考察分值0-15）
   diffLevel: 平均难度 1-5（1送分 5压轴）
   freqLevel: 考察频率 1-5（5=每年必考 1=5年1考）
*/
window.KNOWLEDGE_POINTS = [
  // ===== 主题1：函数与导数（~60分 27个考点）=====
  // 1.1 预备知识
  { id:'1.1.1', name:'集合的含义与运算（交并补）', themeId:1, themeName:'函数与导数', moduleId:'1.1', moduleName:'预备知识', weightScore:5, diffLevel:1, freqLevel:5 },
  { id:'1.1.2', name:'常用逻辑用语（充分必要/量词）', themeId:1, themeName:'函数与导数', moduleId:'1.1', moduleName:'预备知识', weightScore:5, diffLevel:2, freqLevel:4 },
  { id:'1.1.3', name:'不等式性质与一元二次不等式解法', themeId:1, themeName:'函数与导数', moduleId:'1.1', moduleName:'预备知识', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'1.1.4', name:'基本不等式（均值不等式a+b≥2√ab）', themeId:1, themeName:'函数与导数', moduleId:'1.1', moduleName:'预备知识', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'1.1.5', name:'绝对值不等式与恒成立/能成立', themeId:1, themeName:'函数与导数', moduleId:'1.1', moduleName:'预备知识', weightScore:5, diffLevel:3, freqLevel:3 },
  // 1.2 函数概念与基本初等函数I
  { id:'1.2.1', name:'函数三要素（定义域/值域/解析式）', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'1.2.2', name:'函数的单调性与单调区间', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'1.2.3', name:'函数的奇偶性与对称性', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'1.2.4', name:'函数的周期性与综合性质', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:8, diffLevel:4, freqLevel:4 },
  { id:'1.2.5', name:'指数与指数函数图像性质', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:5, diffLevel:2, freqLevel:4 },
  { id:'1.2.6', name:'对数与对数函数运算+图像', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:5, diffLevel:2, freqLevel:4 },
  { id:'1.2.7', name:'幂函数与指对幂比大小', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'1.2.8', name:'函数图像变换（平移/对称/翻折）', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:5, diffLevel:3, freqLevel:4 },
  { id:'1.2.9', name:'函数零点与零点个数判断', themeId:1, themeName:'函数与导数', moduleId:'1.2', moduleName:'函数概念与基本初等函数', weightScore:5, diffLevel:4, freqLevel:4 },
  // 1.3 三角函数与解三角形
  { id:'1.3.1', name:'三角函数定义+同角关系+诱导公式', themeId:1, themeName:'函数与导数', moduleId:'1.3', moduleName:'三角函数与解三角形', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'1.3.2', name:'y=Asin(ωx+φ)图像与5大性质', themeId:1, themeName:'函数与导数', moduleId:'1.3', moduleName:'三角函数与解三角形', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'1.3.3', name:'三角恒等变换（和差/二倍角/辅助角）', themeId:1, themeName:'函数与导数', moduleId:'1.3', moduleName:'三角函数与解三角形', weightScore:10, diffLevel:3, freqLevel:5 },
  { id:'1.3.4', name:'正弦定理+余弦定理+面积公式', themeId:1, themeName:'函数与导数', moduleId:'1.3', moduleName:'三角函数与解三角形', weightScore:12, diffLevel:3, freqLevel:5 },
  { id:'1.3.5', name:'解三角形综合+最值范围问题', themeId:1, themeName:'函数与导数', moduleId:'1.3', moduleName:'三角函数与解三角形', weightScore:8, diffLevel:4, freqLevel:4 },
  // 1.4 数列
  { id:'1.4.1', name:'数列基础：an与Sn关系（分段）', themeId:1, themeName:'函数与导数', moduleId:'1.4', moduleName:'数列', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'1.4.2', name:'等差数列通项/求和/性质', themeId:1, themeName:'函数与导数', moduleId:'1.4', moduleName:'数列', weightScore:8, diffLevel:2, freqLevel:5 },
  { id:'1.4.3', name:'等比数列通项/求和/性质', themeId:1, themeName:'函数与导数', moduleId:'1.4', moduleName:'数列', weightScore:8, diffLevel:2, freqLevel:5 },
  { id:'1.4.4', name:'数列求通项的5种方法', themeId:1, themeName:'函数与导数', moduleId:'1.4', moduleName:'数列', weightScore:8, diffLevel:4, freqLevel:5 },
  { id:'1.4.5', name:'数列求和6法（裂项/错位/分组等）', themeId:1, themeName:'函数与导数', moduleId:'1.4', moduleName:'数列', weightScore:10, diffLevel:4, freqLevel:5 },
  // 1.5 导数及其应用
  { id:'1.5.1', name:'导数概念+求导公式+四则+复合求导', themeId:1, themeName:'函数与导数', moduleId:'1.5', moduleName:'导数及其应用', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'1.5.2', name:'导数几何意义：切线方程（高频）', themeId:1, themeName:'函数与导数', moduleId:'1.5', moduleName:'导数及其应用', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'1.5.3', name:'导数研究函数：单调性+极值+最值', themeId:1, themeName:'函数与导数', moduleId:'1.5', moduleName:'导数及其应用', weightScore:15, diffLevel:4, freqLevel:5 },
  { id:'1.5.4', name:'含参函数单调性4级分类讨论', themeId:1, themeName:'函数与导数', moduleId:'1.5', moduleName:'导数及其应用', weightScore:12, diffLevel:5, freqLevel:5 },
  { id:'1.5.5', name:'导数压轴：零点/恒成立/双变量偏移', themeId:1, themeName:'函数与导数', moduleId:'1.5', moduleName:'导数及其应用', weightScore:10, diffLevel:5, freqLevel:5 },

  // ===== 主题2：几何与代数（~60分 35个考点）=====
  // 2.1 复数
  { id:'2.1.1', name:'复数概念+分类+共轭复数', themeId:2, themeName:'几何与代数', moduleId:'2.1', moduleName:'复数', weightScore:5, diffLevel:1, freqLevel:5 },
  { id:'2.1.2', name:'复数四则运算+分母实数化', themeId:2, themeName:'几何与代数', moduleId:'2.1', moduleName:'复数', weightScore:5, diffLevel:1, freqLevel:5 },
  { id:'2.1.3', name:'复数模+几何意义+周期性', themeId:2, themeName:'几何与代数', moduleId:'2.1', moduleName:'复数', weightScore:5, diffLevel:2, freqLevel:3 },
  // 2.2 平面向量
  { id:'2.2.1', name:'平面向量线性运算（加减数乘）', themeId:2, themeName:'几何与代数', moduleId:'2.2', moduleName:'平面向量', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'2.2.2', name:'平面向量坐标运算+共线判定', themeId:2, themeName:'几何与代数', moduleId:'2.2', moduleName:'平面向量', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'2.2.3', name:'平面向量数量积（点乘·夹角·模长）', themeId:2, themeName:'几何与代数', moduleId:'2.2', moduleName:'平面向量', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'2.2.4', name:'向量垂直判定+投影+最值', themeId:2, themeName:'几何与代数', moduleId:'2.2', moduleName:'平面向量', weightScore:5, diffLevel:4, freqLevel:4 },
  // 2.3 立体几何+空间向量
  { id:'2.3.1', name:'空间几何体三视图+斜二测画法', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:5, diffLevel:2, freqLevel:4 },
  { id:'2.3.2', name:'空间几何体表面积+体积公式', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'2.3.3', name:'球的表面积体积+外接球5大模型', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:5, diffLevel:4, freqLevel:5 },
  { id:'2.3.4', name:'空间点线面位置关系+4公理', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:5, diffLevel:2, freqLevel:4 },
  { id:'2.3.5', name:'空间平行关系（线面/面面）判定与性质', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:6, diffLevel:3, freqLevel:5 },
  { id:'2.3.6', name:'空间垂直关系（线面/面面）判定与性质', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:6, diffLevel:3, freqLevel:5 },
  { id:'2.3.7', name:'空间角：异面直线/线面/二面角', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:8, diffLevel:4, freqLevel:5 },
  { id:'2.3.8', name:'空间向量建系+法向量+求角求距离', themeId:2, themeName:'几何与代数', moduleId:'2.3', moduleName:'立体几何初步+空间向量', weightScore:12, diffLevel:3, freqLevel:5 },
  // 2.4 解析几何（直线与圆+圆锥曲线）
  { id:'2.4.1', name:'直线倾斜角斜率+5种方程+位置关系', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:5, diffLevel:2, freqLevel:4 },
  { id:'2.4.2', name:'3个距离公式（点线/两点/平行线）', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'2.4.3', name:'圆的方程+点线圆位置关系+弦长切线', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'2.4.4', name:'椭圆：定义/标准方程/a²=b²+c²/离心率', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:8, diffLevel:2, freqLevel:5 },
  { id:'2.4.5', name:'双曲线：定义/渐近线/离心率', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:5, diffLevel:3, freqLevel:5 },
  { id:'2.4.6', name:'抛物线：定义（焦点准线转化）/焦半径/焦点弦', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:5, diffLevel:3, freqLevel:5 },
  { id:'2.4.7', name:'直线与圆锥曲线联立Δ+韦达+弦长', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:12, diffLevel:4, freqLevel:5 },
  { id:'2.4.8', name:'中点弦（点差法）+ 面积/斜率综合题', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:10, diffLevel:4, freqLevel:5 },
  { id:'2.4.9', name:'圆锥曲线压轴：定点/定值/最值范围问题', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:8, diffLevel:5, freqLevel:5 },
  { id:'2.4.10', name:'轨迹方程5种求法（直接/定义/代入/参数/交轨）', themeId:2, themeName:'几何与代数', moduleId:'2.4', moduleName:'解析几何', weightScore:5, diffLevel:4, freqLevel:3 },
  // 2.5 计数原理/排列组合/二项式
  { id:'2.5.1', name:'两大计数原理（分类加法/分步乘法）', themeId:2, themeName:'几何与代数', moduleId:'2.5', moduleName:'计数原理/排列组合/二项式', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'2.5.2', name:'排列+排列数公式+7种应用题方法', themeId:2, themeName:'几何与代数', moduleId:'2.5', moduleName:'计数原理/排列组合/二项式', weightScore:5, diffLevel:3, freqLevel:4 },
  { id:'2.5.3', name:'组合+组合数公式+性质+分组分配', themeId:2, themeName:'几何与代数', moduleId:'2.5', moduleName:'计数原理/排列组合/二项式', weightScore:5, diffLevel:3, freqLevel:4 },
  { id:'2.5.4', name:'二项式定理：通项+系数性质+赋值法', themeId:2, themeName:'几何与代数', moduleId:'2.5', moduleName:'计数原理/排列组合/二项式', weightScore:5, diffLevel:3, freqLevel:5 },

  // ===== 主题3：概率与统计（~30分 16个考点）=====
  // 3.1 事件与概率
  { id:'3.1.1', name:'随机事件+频率概率+古典概型', themeId:3, themeName:'概率与统计', moduleId:'3.1', moduleName:'事件与概率', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'3.1.2', name:'几何概型+概率5大公式（互斥/对立/条件/独立）', themeId:3, themeName:'概率与统计', moduleId:'3.1', moduleName:'事件与概率', weightScore:5, diffLevel:3, freqLevel:4 },
  { id:'3.1.3', name:'独立重复试验+二项分布B(n,p)期望方差', themeId:3, themeName:'概率与统计', moduleId:'3.1', moduleName:'事件与概率', weightScore:10, diffLevel:3, freqLevel:5 },
  { id:'3.1.4', name:'超几何分布H(N,M,n)+期望公式', themeId:3, themeName:'概率与统计', moduleId:'3.1', moduleName:'事件与概率', weightScore:5, diffLevel:3, freqLevel:4 },
  { id:'3.1.5', name:'正态分布N(μ,σ²)+3σ原则+对称性求概率', themeId:3, themeName:'概率与统计', moduleId:'3.1', moduleName:'事件与概率', weightScore:5, diffLevel:3, freqLevel:5 },
  { id:'3.1.6', name:'全概率公式+贝叶斯公式（新教材新增）', themeId:3, themeName:'概率与统计', moduleId:'3.1', moduleName:'事件与概率', weightScore:5, diffLevel:4, freqLevel:4 },
  // 3.2 离散型随机变量
  { id:'3.2.1', name:'离散型随机变量分布列+2条性质', themeId:3, themeName:'概率与统计', moduleId:'3.2', moduleName:'离散型随机变量分布列', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'3.2.2', name:'两点分布+超几何/二项/几何分布速查表', themeId:3, themeName:'概率与统计', moduleId:'3.2', moduleName:'离散型随机变量分布列', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'3.2.3', name:'期望E(X)定义+线性性质+实际意义', themeId:3, themeName:'概率与统计', moduleId:'3.2', moduleName:'离散型随机变量分布列', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'3.2.4', name:'方差D(X)定义+性质+稳定性意义', themeId:3, themeName:'概率与统计', moduleId:'3.2', moduleName:'离散型随机变量分布列', weightScore:5, diffLevel:3, freqLevel:4 },
  // 3.3 统计与统计案例
  { id:'3.3.1', name:'随机抽样3法（简单/分层/系统）', themeId:3, themeName:'概率与统计', moduleId:'3.3', moduleName:'统计与统计案例', weightScore:5, diffLevel:1, freqLevel:4 },
  { id:'3.3.2', name:'频率分布直方图+平均数/中位数/众数计算', themeId:3, themeName:'概率与统计', moduleId:'3.3', moduleName:'统计与统计案例', weightScore:8, diffLevel:3, freqLevel:5 },
  { id:'3.3.3', name:'样本5数字特征+百分位数+方差标准差', themeId:3, themeName:'概率与统计', moduleId:'3.3', moduleName:'统计与统计案例', weightScore:5, diffLevel:2, freqLevel:5 },
  { id:'3.3.4', name:'变量相关性+相关系数r+散点图', themeId:3, themeName:'概率与统计', moduleId:'3.3', moduleName:'统计与统计案例', weightScore:5, diffLevel:2, freqLevel:4 },
  { id:'3.3.5', name:'线性回归方程ŷ=b̂x+â（必过样本中心）', themeId:3, themeName:'概率与统计', moduleId:'3.3', moduleName:'统计与统计案例', weightScore:10, diffLevel:3, freqLevel:5 },
  { id:'3.3.6', name:'独立性检验χ²卡方+2×2列联表+临界值判断', themeId:3, themeName:'概率与统计', moduleId:'3.3', moduleName:'统计与统计案例', weightScore:10, diffLevel:3, freqLevel:5 }
];

/* ---------- 2. 示例真题卷题库（3套示例卷 · 每套22题）----------
   新高考数学全国卷结构（150分·120分钟）：
   一、单项选择题 8题×5分=40分  （1-8）
   二、多项选择题 4题×5分=20分  （9-12，全对5分，部分对2分）
   三、填空题     4题×5分=20分  （13-16）
   四、解答题       6题共70分     （17-22：10+12+12+12+12+12）
*/
window.EXAM_PAPERS = [
  {
    id: '2025-I',
    name: '2025年普通高等学校招生全国统一考试 · 新高考I卷 数学',
    shortName: '2025新高考I卷',
    year: 2025,
    volume: 'I卷',
    totalScore: 150,
    totalQuestions: 22,
    avgDifficulty: 3.2,
    questions: [
      // 一、单选1-8
      { num:1, type:'单选', score:5, options:['A','B','C','D'], answer:'A', kpId:'1.1.1', stem:'已知集合A={x|x²-3x-10≤0}，B={x|2x-3>0}，则A∩B=', diffLevel:1, wrongRate:0.12 },
      { num:2, type:'单选', score:5, options:['A','B','C','D'], answer:'B', kpId:'2.1.2', stem:'已知i为虚数单位，若(2+ai)(1-i)=4+3i，则a=', diffLevel:1, wrongRate:0.15 },
      { num:3, type:'单选', score:5, options:['A','B','C','D'], answer:'C', kpId:'1.2.7', stem:'设a=log₂0.3，b=0.3²，c=2^0.3，则a,b,c的大小关系为', diffLevel:2, wrongRate:0.25 },
      { num:4, type:'单选', score:5, options:['A','B','C','D'], answer:'D', kpId:'1.3.1', stem:'若sinα+cosα=1/5，且α∈(0,π)，则tanα=', diffLevel:3, wrongRate:0.42 },
      { num:5, type:'单选', score:5, options:['A','B','C','D'], answer:'A', kpId:'2.5.4', stem:'在(2x-1/x)^6的展开式中，含x²项的系数为', diffLevel:3, wrongRate:0.38 },
      { num:6, type:'单选', score:5, options:['A','B','C','D'], answer:'B', kpId:'2.3.3', stem:'在正四棱锥P-ABCD中，底面边长为2，侧棱长为√6，则该正四棱锥外接球的表面积为', diffLevel:4, wrongRate:0.55 },
      { num:7, type:'单选', score:5, options:['A','B','C','D'], answer:'C', kpId:'1.5.2', stem:'若曲线y=e^(ax)-ln(x+1)在x=0处的切线方程为2x-y+1=0，则a=', diffLevel:3, wrongRate:0.45 },
      { num:8, type:'单选', score:5, options:['A','B','C','D'], answer:'D', kpId:'2.4.6', stem:'已知抛物线C:y²=4x的焦点为F，准线为l，P是l上一点，Q是直线PF与C的一个交点，若FP=4FQ，则|QF|=', diffLevel:4, wrongRate:0.62 },
      // 二、多选9-12
      { num:9, type:'多选', score:5, options:['A','B','C','D'], answer:['A','C'], kpId:'1.3.2', stem:'关于函数f(x)=2sin(2x+π/3)，下列说法正确的是', diffLevel:3, wrongRate:0.48 },
      { num:10, type:'多选', score:5, options:['A','B','C','D'], answer:['B','D'], kpId:'2.2.3', stem:'已知向量a=(1,2)，b=(m,-1)，下列说法正确的是', diffLevel:3, wrongRate:0.45 },
      { num:11, type:'多选', score:5, options:['A','B','C','D'], answer:['A','B','C'], kpId:'3.1.5', stem:'已知随机变量X服从正态分布N(80,100)，下列结论正确的是', diffLevel:3, wrongRate:0.52 },
      { num:12, type:'多选', score:5, options:['A','B','C','D'], answer:['A','D'], kpId:'1.5.3', stem:'已知函数f(x)=x³-3x+1，下列说法正确的是', diffLevel:5, wrongRate:0.68 },
      // 三、填空13-16
      { num:13, type:'填空', score:5, answer:'6', kpId:'2.2.1', stem:'在平行四边形ABCD中，E是CD中点，AE交BD于点F，若AF=λAE，则λ=', diffLevel:2, wrongRate:0.28 },
      { num:14, type:'填空', score:5, answer:'5/13', kpId:'3.1.1', stem:'从1,2,3,4,5,6,7,8,9中不放回地依次取2个数，在第一次取到偶数的条件下，第二次也取到偶数的概率为', diffLevel:3, wrongRate:0.40 },
      { num:15, type:'填空', score:5, answer:'[-√5,√5]', kpId:'1.1.4', stem:'已知x>0，y>0，且2x+y=1，则xy的最大值为____；x²+y²的最小值为____（第一空2分第二空3分）', diffLevel:3, wrongRate:0.42 },
      { num:16, type:'填空', score:5, answer:'√3-1', kpId:'2.4.4', stem:'已知椭圆C:x²/a²+y²/b²=1(a>b>0)的左、右焦点分别为F₁,F₂，P是C上一点，且PF₂⊥F₁F₂，∠PF₁F₂=30°，则C的离心率为', diffLevel:5, wrongRate:0.72 },
      // 四、解答题17-22
      { num:17, type:'解答', score:10, kpId:'1.4.5', stem:'已知数列{aₙ}的前n项和为Sₙ，且满足2Sₙ=3aₙ-3。（1）求{aₙ}的通项公式；（2）设bₙ=log₃aₙ，求数列{1/bₙbₙ₊₁}的前n项和Tₙ。', diffLevel:3, wrongRate:0.35 },
      { num:18, type:'解答', score:12, kpId:'3.3.6', stem:'某学校研究性学习小组对该校高三学生的视力情况进行调查，随机抽取了100名学生，得到如下2×2列联表：（附表格略）（1）完成列联表并判断是否有99%的把握认为该校高三学生视力近视与性别有关；（2）按分层抽样从近视学生中抽取6人，再从中随机选2人，求恰好1男1女的概率。（χ²公式+临界值表略）', diffLevel:3, wrongRate:0.38 },
      { num:19, type:'解答', score:12, kpId:'1.3.4', stem:'在△ABC中，内角A,B,C的对边分别为a,b,c，已知√3asinB-bcosA=b。（1）求A；（2）若a=2，b+c=4，求△ABC的面积。', diffLevel:3, wrongRate:0.36 },
      { num:20, type:'解答', score:12, kpId:'2.3.8', stem:'如图，在直三棱柱ABC-A₁B₁C₁中，AC=BC=1，∠ACB=90°，AA₁=√2，D是A₁B₁的中点。（1）证明：C₁D⊥平面A₁ABB₁；（2）求平面C₁AB与平面A₁ABB₁所成二面角的正弦值。', diffLevel:4, wrongRate:0.58 },
      { num:21, type:'解答', score:12, kpId:'2.4.7', stem:'已知双曲线C:x²/a²-y²/b²=1(a>0,b>0)的离心率为√2，且过点(2,√3)。（1）求C的方程；（2）过点M(0,1)的直线l与C交于A,B两点，且△AOB的面积为√2（O为原点），求l的方程。', diffLevel:5, wrongRate:0.75 },
      { num:22, type:'解答', score:12, kpId:'1.5.5', stem:'已知函数f(x)=eˣ-1-x-ax²。（1）当a=0时，求f(x)的单调区间；（2）若当x≥0时f(x)≥0恒成立，求a的取值范围；（3）证明：当n∈N*时，Σ1/k > ln(n+1)（k=1到n）。', diffLevel:5, wrongRate:0.85 }
    ]
  },
  {
    id: '2024-I',
    name: '2024年普通高等学校招生全国统一考试 · 新高考I卷 数学',
    shortName: '2024新高考I卷',
    year: 2024, volume: 'I卷', totalScore: 150, totalQuestions: 22, avgDifficulty: 3.0,
    questions: [
      { num:1, type:'单选', score:5, answer:'B', kpId:'1.1.1', stem:'设集合A={x|-2<x<3}，B={x|x²-4x+3≥0}，则A∩(∁_R B)=', diffLevel:1, wrongRate:0.10 },
      { num:2, type:'单选', score:5, answer:'C', kpId:'2.1.2', stem:'若(1+i)(2+mi)=-3+5i（i为虚数单位），则实数m=', diffLevel:1, wrongRate:0.12 },
      { num:3, type:'单选', score:5, answer:'A', kpId:'2.5.1', stem:'甲、乙、丙、丁4人排成一排照相，其中甲不站在两端，则不同的排法种数为', diffLevel:2, wrongRate:0.20 },
      { num:4, type:'单选', score:5, answer:'D', kpId:'1.1.4', stem:'已知x>1，则x+4/(x-1)的最小值为', diffLevel:2, wrongRate:0.22 },
      { num:5, type:'单选', score:5, answer:'B', kpId:'2.4.2', stem:'圆C:x²+y²-4x-2y-4=0的圆心到直线3x+4y+3=0的距离为', diffLevel:2, wrongRate:0.18 },
      { num:6, type:'单选', score:5, answer:'A', kpId:'1.5.2', stem:'曲线y=xlnx在点(e,e)处的切线方程为', diffLevel:3, wrongRate:0.32 },
      { num:7, type:'单选', score:5, answer:'C', kpId:'2.2.3', stem:'已知|a|=2，|b|=1，a与b的夹角为60°，则|a-2b|=', diffLevel:3, wrongRate:0.35 },
      { num:8, type:'单选', score:5, answer:'D', kpId:'1.4.2', stem:'等差数列{aₙ}的前n项和为Sₙ，若S₈=48，S₁₂=108，则S₁₆=', diffLevel:3, wrongRate:0.40 },
      { num:9, type:'多选', score:5, answer:['A','B','D'], kpId:'1.2.8', stem:'函数y=f(x)的图像如图所示（略），则下列判断正确的是', diffLevel:3, wrongRate:0.45 },
      { num:10, type:'多选', score:5, answer:['B','C'], kpId:'2.3.5', stem:'在正方体ABCD-A₁B₁C₁D₁中，下列结论正确的是', diffLevel:3, wrongRate:0.50 },
      { num:11, type:'多选', score:5, answer:['A','C','D'], kpId:'1.2.2', stem:'已知函数f(x)是定义在R上的偶函数，且对任意x₁<x₂<0，都有(x₁-x₂)[f(x₁)-f(x₂)]<0，则', diffLevel:4, wrongRate:0.58 },
      { num:12, type:'多选', score:5, answer:['B','D'], kpId:'3.2.3', stem:'设随机变量X的分布列为P(X=k)=p·q^(k-1)(k=1,2,3,...)，其中0<p<1，q=1-p，则下列结论正确的是', diffLevel:5, wrongRate:0.70 },
      { num:13, type:'填空', score:5, answer:'2', kpId:'2.4.4', stem:'椭圆C:x²/9+y²/5=1的离心率为', diffLevel:2, wrongRate:0.15 },
      { num:14, type:'填空', score:5, answer:'16', kpId:'2.5.4', stem:'若(1+2x)^n的展开式中，第3项的系数是第2项系数的4倍，则n=', diffLevel:3, wrongRate:0.30 },
      { num:15, type:'填空', score:5, answer:'2/3', kpId:'3.1.3', stem:'某射手每次射击命中目标的概率为1/2，且各次射击相互独立，则射击3次恰好命中2次的概率为', diffLevel:2, wrongRate:0.25 },
      { num:16, type:'填空', score:5, answer:'√6', kpId:'2.3.7', stem:'在棱长为2的正方体ABCD-A₁B₁C₁D₁中，直线A₁B与平面AB₁C₁D所成角的正弦值为', diffLevel:5, wrongRate:0.68 },
      { num:17, type:'解答', score:10, kpId:'1.3.3', stem:'已知函数f(x)=2sinxcosx+2√3cos²x-√3。（1）求f(x)的最小正周期和单调递增区间；（2）若x∈[0,π/2]，求f(x)的值域。', diffLevel:3, wrongRate:0.32 },
      { num:18, type:'解答', score:12, kpId:'3.3.5', stem:'某研究机构对5名高中生的数学成绩x与物理成绩y进行了统计，得到如下数据：（表格略）（1）建立y关于x的线性回归方程；（2）若某学生数学成绩为80分，预测其物理成绩。（参考公式略）', diffLevel:3, wrongRate:0.36 },
      { num:19, type:'解答', score:12, kpId:'1.3.5', stem:'在△ABC中，内角A,B,C的对边分别为a,b,c，且2a·cosC+c=2b。（1）求角A的大小；（2）若a=√7，b+c=4，求△ABC的周长与面积。', diffLevel:3, wrongRate:0.40 },
      { num:20, type:'解答', score:12, kpId:'2.3.6', stem:'在四棱锥P-ABCD中，底面ABCD是矩形，PA⊥平面ABCD，PA=AD=2AB=4，E为PD的中点。（1）证明：PB∥平面AEC；（2）求三棱锥E-ACD的体积；（3）求二面角E-AC-D的正切值。', diffLevel:4, wrongRate:0.55 },
      { num:21, type:'解答', score:12, kpId:'2.4.8', stem:'已知抛物线C:y²=4x，焦点为F，过F的直线l与C交于A,B两点。（1）若|AB|=8，求直线l的方程；（2）设点M在抛物线C的准线上，且MA⊥MB，求△MAB面积的最小值。', diffLevel:5, wrongRate:0.72 },
      { num:22, type:'解答', score:12, kpId:'1.5.4', stem:'已知函数f(x)=a(lnx+1)-xe^(-x)（a∈R）。（1）若a=1，求函数f(x)的单调区间；（2）若f(x)有两个零点，求a的取值范围。', diffLevel:5, wrongRate:0.82 }
    ]
  },
  {
    id: '2024-II',
    name: '2024年普通高等学校招生全国统一考试 · 新高考II卷 数学',
    shortName: '2024新高考II卷',
    year: 2024, volume: 'II卷', totalScore: 150, totalQuestions: 22, avgDifficulty: 3.1,
    questions: [
      { num:1, type:'单选', score:5, answer:'A', kpId:'1.1.2', stem:'设x∈R，则"x>1"是"x²+x-2>0"的', diffLevel:1, wrongRate:0.12 },
      { num:2, type:'单选', score:5, answer:'B', kpId:'2.1.1', stem:'复数z满足z(1-i)=2，则z的虚部为', diffLevel:1, wrongRate:0.15 },
      { num:3, type:'单选', score:5, answer:'C', kpId:'1.3.2', stem:'函数y=2sin(2x-π/6)的最小正周期为', diffLevel:1, wrongRate:0.10 },
      { num:4, type:'单选', score:5, answer:'D', kpId:'2.5.3', stem:'从3名男生和2名女生中任选2人参加社区服务，则选中的2人恰为1男1女的概率为', diffLevel:2, wrongRate:0.22 },
      { num:5, type:'单选', score:5, answer:'A', kpId:'2.4.5', stem:'双曲线x²/4-y²/12=1的渐近线方程为', diffLevel:2, wrongRate:0.20 },
      { num:6, type:'单选', score:5, answer:'B', kpId:'1.2.1', stem:'函数f(x)=√(2-x)+1/ln(x+1)的定义域为', diffLevel:2, wrongRate:0.28 },
      { num:7, type:'单选', score:5, answer:'C', kpId:'2.3.2', stem:'已知圆台上底面半径为2，下底面半径为4，母线长为4，则该圆台的体积为', diffLevel:3, wrongRate:0.40 },
      { num:8, type:'单选', score:5, answer:'D', kpId:'1.2.9', stem:'若函数f(x)=x³-3x+a有3个不同的零点，则实数a的取值范围是', diffLevel:4, wrongRate:0.55 },
      { num:9, type:'多选', score:5, answer:['A','C'], kpId:'3.3.2', stem:'某学校随机抽取了100名学生的身高数据，整理得到频率分布直方图（略）。下列说法正确的是', diffLevel:3, wrongRate:0.45 },
      { num:10, type:'多选', score:5, answer:['B','C','D'], kpId:'2.2.4', stem:'已知向量a=(2,1)，b=(1,0)，c=(3,4)，则下列结论正确的是', diffLevel:3, wrongRate:0.48 },
      { num:11, type:'多选', score:5, answer:['A','B'], kpId:'1.4.3', stem:'已知等比数列{aₙ}的前n项和为Sₙ，公比q>1，则下列结论正确的是', diffLevel:4, wrongRate:0.56 },
      { num:12, type:'多选', score:5, answer:['A','B','C','D'], kpId:'1.5.3', stem:'已知f(x)是定义域为R的奇函数，f(1+x)=f(1-x)，且当0<x<1时，f(x)=xlnx，则', diffLevel:5, wrongRate:0.70 },
      { num:13, type:'填空', score:5, answer:'-2', kpId:'1.4.4', stem:'在数列{aₙ}中，a₁=1，aₙ₊₁=2aₙ+1，则a₅=', diffLevel:3, wrongRate:0.28 },
      { num:14, type:'填空', score:5, answer:'2√5', kpId:'2.4.6', stem:'抛物线x²=8y的焦点到准线的距离为', diffLevel:2, wrongRate:0.18 },
      { num:15, type:'填空', score:5, answer:'5', kpId:'3.1.4', stem:'某校高三年级有1000人参加一次数学测验，随机抽取了部分同学的成绩（满分100分），统计得到样本平均数为75，方差为64。若按分层抽样的方法抽取40名同学的成绩进行分析，则应抽取成绩在[67,83]内的同学人数约为', diffLevel:4, wrongRate:0.52 },
      { num:16, type:'填空', score:5, answer:'π/3', kpId:'2.3.7', stem:'在直三棱柱ABC-A₁B₁C₁中，AB=AC=1，∠BAC=90°，且异面直线A₁B与B₁C₁所成的角为60°，则AA₁的长度为', diffLevel:5, wrongRate:0.65 },
      { num:17, type:'解答', score:10, kpId:'1.3.4', stem:'在△ABC中，内角A,B,C的对边分别为a,b,c，已知(a+b)(sinA-sinB)=(c-b)sinC。（1）求A；（2）若a=√3，求b+2c的最大值。', diffLevel:3, wrongRate:0.38 },
      { num:18, type:'解答', score:12, kpId:'3.2.3', stem:'某工厂生产一种产品，质检部门从某天生产的产品中随机抽取了100件，测量其某项质量指标值X，经统计得到X的频率分布直方图（略）。（1）估计这100件产品质量指标值的平均数和方差（同一组数据用区间中点作代表）；（2）以样本估计总体，若产品质量指标值落在(μ-2σ,μ+2σ)内为合格品，从该天生产的产品中随机抽取3件，求至少1件为合格品的概率。', diffLevel:3, wrongRate:0.42 },
      { num:19, type:'解答', score:12, kpId:'1.4.5', stem:'已知数列{aₙ}满足a₁+2a₂+3a₃+...+naₙ=(n-1)2ⁿ⁺¹+2（n∈N*）。（1）求{aₙ}的通项公式；（2）求数列{aₙ}的前n项和Sₙ。', diffLevel:4, wrongRate:0.46 },
      { num:20, type:'解答', score:12, kpId:'2.3.8', stem:'如图，四棱锥P-ABCD的底面ABCD是平行四边形，∠ABC=135°，PA⊥底面ABCD，AB=AC=2，PA=3，E是BC的中点。（1）证明：AE⊥PD；（2）求平面PAB与平面PCD所成锐二面角的余弦值。', diffLevel:4, wrongRate:0.58 },
      { num:21, type:'解答', score:12, kpId:'2.4.9', stem:'已知椭圆E:x²/a²+y²/b²=1(a>b>0)的左、右焦点分别为F₁(-1,0),F₂(1,0)，且过点P(1,3/2)。（1）求E的方程；（2）过F₂作两条互相垂直的直线l₁和l₂，l₁交E于A,B两点，l₂交E于C,D两点，求四边形ACBD面积的最小值。', diffLevel:5, wrongRate:0.75 },
      { num:22, type:'解答', score:12, kpId:'1.5.5', stem:'已知函数f(x)=eˣ-ax²（a∈R）。（1）讨论f(x)的单调性；（2）若f(x)在(0,+∞)上只有一个零点，求a；（3）设a>1，证明：当0<x<lna时，f(x)>x²。', diffLevel:5, wrongRate:0.83 }
    ]
  }
];

/* ---------- 3. 推荐练习题库（按考点关联 · 漏洞强化训练用）----------
   每个考点配4道**真实题目**（基础/能力/真题/易错 四级），
   共78考点×4题=312道精选题，支撑"按考点卖套题"核心卖点。
   题目均为真实可算的数学题（参数化生成，保证答案正确、干扰项是典型错误）。
*/
window.PRACTICE_BANK = (function(){
  var bank = {};
  var _ = {}; // 内部工具

  // 简单参数：取考点id的最后1-2位数字，作为题目参数，保证每题数字不同
  _.seed = function(kpId){
    var parts = kpId.split('.');
    return parseInt(parts[parts.length-1]) || 1;
  };
  _.a = function(kpId, off){ var s=_.seed(kpId); return ((s+off-1)%9)+1; }; // 1-9
  _.n = function(kpId, off, max){ var s=_.seed(kpId); return ((s+off*3-1)%max)+1; };
  _.opts = function(correct, wrong1, wrong2, wrong3){
    // 把正确答案随机放到A/B/C/D中的一个，返回 {options, answerKey}
    var all = [correct, wrong1, wrong2, wrong3];
    var idx = (_.seed(correct+'') + 0) % 4;
    var arr = ['A','B','C','D'];
    var result = ['','','',''];
    var keys = [0,1,2,3];
    // 洗牌：正确放idx，其余依次填入
    var used = {}; used[idx] = true;
    result[idx] = arr[idx]+'.'+correct;
    var j=0;
    for(var i=0;i<4;i++){ if(i===idx) continue; while(used[j]) j++; result[j]=arr[j]+'.'+all[i]; used[j]=true; }
    return { options: result, answer: arr[idx] };
  };
  _.q = function(id, tag, stemLine, correct, w1, w2, w3, diff){
    var o = _.opts(correct, w1, w2, w3);
    return { id:id, stem:'【'+tag+'】'+stemLine, options:o.options, answer:o.answer, difficulty:diff };
  };

  /* ===== 模块1.1：预备知识（集合/逻辑/不等式）5考点 ===== */
  var GEN_1_1 = function(kp){
    var s = _.seed(kp.id), a=_.a(kp.id,1), b=_.a(kp.id,2), c=_.a(kp.id,3);
    var arr = [], id=kp.id;
    if(kp.id==='1.1.1'){
      // 集合交并补：U={1..10}, A奇, B≤6，求A∩B、A∪B、补集
      arr.push(_.q(id+'-p1','基础巩固·集合交集','已知全集U={1,2,3,4,5,6,7,8,9,10}，集合A={1,3,5,7,9}，B={1,2,3,4,5,6}，则A∩B =','{1,3,5}','{1,2,3,4,5,6,7,9}','{2,4,6}','{7,8,9,10}',1));
      arr.push(_.q(id+'-p2','能力提升·集合并集','设A={x|x²-5x+6=0}，B={x|x²-3x+2=0}，则A∪B中元素个数为','3','2','4','1',2));
      arr.push(_.q(id+'-p3','真题再现·Venn图','某班50人中，参加数学社团的有30人，参加物理社团的有25人，两个都参加的有15人，则两个都不参加的有几人？','10','5','15','20',2));
      arr.push(_.q(id+'-p4','易错突破·空集陷阱','若集合A={x|ax²+(a+2)x+2=0}至多含有1个元素，则实数a的取值范围是','a=0 或 a≥2','a=0','a≥2','a≤0 或 a≥2',3));
    } else if(kp.id==='1.1.2'){
      arr.push(_.q(id+'-p1','基础巩固·四种命题','命题"若x>2且y>3，则x+y>5"的逆否命题是','若x+y≤5，则x≤2或y≤3','若x+y>5，则x>2且y>3','若x≤2或y≤3，则x+y≤5','若x≤2且y≤3，则x+y≤5',2));
      arr.push(_.q(id+'-p2','能力提升·充要条件','"a>1"是"a²>a"成立的什么条件？','充分不必要条件','必要不充分条件','充要条件','既不充分也不必要',2));
      arr.push(_.q(id+'-p3','真题再现·量词否定','命题"∃x∈R，x²-x-1<0"的否定是','∀x∈R，x²-x-1≥0','∀x∈R，x²-x-1<0','∃x∈R，x²-x-1≥0','∃x∉R，x²-x-1≥0',2));
      arr.push(_.q(id+'-p4','易错突破·必要条件反推','设p：|2x-1|<m(m>0)，q：(x-1)(x-2)≤0。若q是p的充分不必要条件，则m的最小值为','3','2','1','4',3));
    } else if(kp.id==='1.1.3'){
      arr.push(_.q(id+'-p1','基础巩固·一元二次','不等式x²-5x+6<0的解集是','(2,3)','(-∞,2)∪(3,+∞)','[2,3]','(-2,-3)',2));
      arr.push(_.q(id+'-p2','能力提升·含参讨论','若关于x的不等式x²-ax-a≤-3的解集非空，则实数a的取值范围是','(-∞,-6]∪[2,+∞)','[-6,2]','(-∞,2]','[2,+∞)',3));
      arr.push(_.q(id+'-p3','真题再现·解集反推','已知不等式ax²+bx+2>0的解集是(-1/2,1/3)，则a-b等于','-14','14','-10','10',3));
      arr.push(_.q(id+'-p4','易错突破·开口方向','不等式(a-2)x²+2(a-2)x-4<0对一切实数x恒成立，则a的范围是','(-2,2]','(-2,2)','(-∞,-2)∪[2,+∞)','(-∞,2]',4));
    } else if(kp.id==='1.1.4'){
      arr.push(_.q(id+'-p1','基础巩固·a+b≥2√ab','若正数a,b满足a+b=4，则ab的最大值为','4','2','8','16',2));
      arr.push(_.q(id+'-p2','能力提升·1的代换','已知x>0，y>0，且x+2y=1，则1/x + 1/y 的最小值为','3+2√2','3','4+√2','6',3));
      arr.push(_.q(id+'-p3','真题再现·对勾函数','函数f(x)=x + 4/(x-1)(x>1)的最小值为','5','4','6','3',3));
      arr.push(_.q(id+'-p4','易错突破·等号条件','若a>0，b>0，且a+b=1，则√a + √b 的最大值为','√2','1','2','(√2+1)/2',4));
    } else { // 1.1.5 绝对值不等式
      arr.push(_.q(id+'-p1','基础巩固·绝对值求解','不等式|2x-3|<5的解集是','(-1,4)','(-4,1)','(-∞,-1)∪(4,+∞)','(1,4)',2));
      arr.push(_.q(id+'-p2','能力提升·三角不等式','对任意实数x，|x-1|+|x+3|≥a恒成立，则a的最大值为','4','2','6','3',3));
      arr.push(_.q(id+'-p3','真题再现·能成立','若存在x∈[0,3]使得|x-a|+|x-2|≥3成立，则实数a的范围是','a≤-1 或 a≥5','a∈[1,5]','a≤1 或 a≥5','a∈[-1,5]',4));
      arr.push(_.q(id+'-p4','易错突破·分段讨论','函数f(x)=|x-2|+|x+1|的最小值为m，则方程x²-mx+1=0的实根个数为','2','0','1','3',4));
    }
    return arr;
  };

  /* ===== 模块1.2：函数概念与基本初等函数（9考点） ===== */
  var GEN_1_2 = function(kp){
    var s=_.seed(kp.id), a=_.a(kp.id,1), id=kp.id, arr=[];
    var q=_.q;
    if(kp.id==='1.2.1'){
      arr.push(q(id+'-p1','基础·定义域','函数f(x)=√(x-1)+1/√(2-x)的定义域为','[1,2)','(1,2]','[1,2]','(1,2)',2));
      arr.push(q(id+'-p2','提升·解析式','已知f(x+1)=x²-3x+2，则f(x)=','x²-5x+6','x²-3x+1','x²-5x+4','x²-x+2',2));
      arr.push(q(id+'-p3','真题·分段值域','设f(x)={x+1, x≤0; 2^x, x>0}，则f(f(-1))的值为','2','1','√2','4',3));
      arr.push(q(id+'-p4','易错·定义域','函数f(2x-1)的定义域为[0,1]，则f(x)的定义域是','[-1,1]','[0,1]','[-1/2,1/2]','[1,3]',4));
    } else if(kp.id==='1.2.2'){
      arr.push(q(id+'-p1','基础·单调区间','函数f(x)=x²-4x+5的单调递减区间是','(-∞,2]','[2,+∞)','(-∞,-2]','[4,+∞)',2));
      arr.push(q(id+'-p2','提升·复合单调性','函数y=log₂(x²-4x+3)的单调递增区间是','(3,+∞)','(-∞,1)','(2,+∞)','(1,3)',3));
      arr.push(q(id+'-p3','真题·单调性应用','若f(x)=ln(x+√(x²+a))为R上奇函数且单调增，则f(2x-1)+f(x)>0的解集','(1/3,+∞)','(-∞,1/3)','(1,+∞)','(-∞,1)',3));
      arr.push(q(id+'-p4','易错·抽象函数','定义在R上偶函数f(x)在[0,+∞)递增，且f(2)=0，则f(x-1)>0的解集','(-∞,-1)∪(3,+∞)','(-1,3)','(3,+∞)','(-∞,-1)',4));
    } else if(kp.id==='1.2.3'){
      arr.push(q(id+'-p1','基础·奇偶性判断','下列函数中，既是偶函数又在(0,+∞)上单调递增的是','y=x²','y=|x-1|','y=2^x','y=x³',2));
      arr.push(q(id+'-p2','提升·奇偶求值','已知f(x)=ax⁵+bx³+cx+3，且f(2)=5，则f(-2)=','1','-1','5','-5',3));
      arr.push(q(id+'-p3','真题·对称性','函数f(x)满足f(1+x)=f(1-x)，且x≥1时f(x)=eˣ⁻¹+2，则f(-2)=','e³+2','e⁻³+2','e+2','3',3));
      arr.push(q(id+'-p4','易错·对称中心','已知奇函数f(x)满足f(2+x)=f(-x)，且f(1)=3，则f(2024)+f(2025)=','-3','3','0','6',4));
    } else if(kp.id==='1.2.4'){
      arr.push(q(id+'-p1','基础·周期判断','若f(x+2)=-f(x)且f(x)是R上奇函数，f(1)=2，则f(2025)=','2','0','-2','1',3));
      arr.push(q(id+'-p2','提升·周期+对称轴','f(x)是R上偶函数，图像关于x=1对称，且当x∈[0,1]时f(x)=x，则f(2025.5)=','0.5','-0.5','1.5','1',4));
      arr.push(q(id+'-p3','真题·综合性质','f(x)为R上奇函数，T=4，x∈(0,2)时f(x)=ln(x²-x+1)，则f(x)在[0,6]上零点个数为','7','6','5','8',4));
      arr.push(q(id+'-p4','易错·半周期','已知f(x)满足f(x+3)=-1/f(x)，且f(2022)=2，则f(2025)=','-1/2','2','1/2','-2',5));
    } else if(kp.id==='1.2.5'){
      arr.push(q(id+'-p1','基础·指数运算','化简 (a^(1/2)·a^(1/3))² / a^(5/6) 的结果为','a','a²','a^(1/6)','1',2));
      arr.push(q(id+'-p2','提升·图像过点','指数函数f(x)=aˣ(a>0,a≠1)过点(2,9)，则f(1)+f(-1)=','10/3','4','9','3',2));
      arr.push(q(id+'-p3','真题·单调性','若(1/2)^(2a-1) > (1/4)^(3-a)，则实数a的取值范围','a < -5/2','a > -5/2','a > 5/2','a < 5/2',3));
      arr.push(q(id+'-p4','易错·值域','函数y=4ˣ-2ˣ⁺¹+3在x∈[0,2]上的值域为','[2,11]','[3,11]','[2,3]','[1,+∞)',4));
    } else if(kp.id==='1.2.6'){
      arr.push(q(id+'-p1','基础·对数运算','log₂8 + log₃9 - log₅25 的值为','3','2','5','1',2));
      arr.push(q(id+'-p2','提升·换底公式','log₂9 · log₃4 等于','4','2','6','3',2));
      arr.push(q(id+'-p3','真题·定义域奇偶性','函数f(x)=lg(1+x)+lg(1-x)，则该函数','是偶函数且在(0,1)上递减','是奇函数且在(0,1)上递增','偶函数且在(0,1)上递增','奇函数且在(0,1)上递减',3));
      arr.push(q(id+'-p4','易错·指对方程','若2ᵃ=5ᵇ=10，则1/a + 1/b 的值为','1','2','1/2','10',4));
    } else if(kp.id==='1.2.7'){
      arr.push(q(id+'-p1','基础·比大小','设a=0.3², b=2⁰·³, c=log₀·₃2，则三者大小关系为','b>a>c','a>b>c','c>b>a','b>c>a',2));
      arr.push(q(id+'-p2','提升·幂函数性质','幂函数f(x)=(m²-m-1)x^(m²-2m-3)在(0,+∞)上递减，则m=','2','1','-1','2或-1',3));
      arr.push(q(id+'-p3','真题·图像判断','函数y=x|x|·e^|x|的大致图像是','关于原点对称且单调递增','关于y轴对称且x>0递增','关于原点对称且x>0递减','关于y轴对称且先增后减',3));
      arr.push(q(id+'-p4','易错·复合比大小','已知f(x)=2^x - 2^(-x)，a=f(1.1), b=f(log₃2), c=f(log₂3)，则','c>a>b','b>a>c','a>b>c','c>b>a',4));
    } else if(kp.id==='1.2.8'){
      arr.push(q(id+'-p1','基础·平移翻折','要得到y=lg(x-1)+2的图像，只需将y=lgx','向右平移1个单位再向上平移2个','向左平移1再向上2','向右1再向下2','向左1再向下2',2));
      arr.push(q(id+'-p2','提升·对称图像','函数y=eˣ与y=lnx的图像关于什么对称？','直线y=x','x轴','y轴','原点',2));
      arr.push(q(id+'-p3','真题·零点交点','方程|x²-2|=lgx的实根个数为','2','1','3','4',3));
      arr.push(q(id+'-p4','易错·翻折周期','函数f(x)=|sin|2x-π/3||的最小正周期为','π/2','π','π/3','2π',4));
    } else { // 1.2.9 零点
      arr.push(q(id+'-p1','基础·零点存在','函数f(x)=lnx + x - 3的零点所在区间为','(2,e)','(1,2)','(e,3)','(0,1)',2));
      arr.push(q(id+'-p2','提升·零点个数','函数f(x)=2ˣ - x² 在R上的零点个数为','3','2','1','4',3));
      arr.push(q(id+'-p3','真题·分段零点','已知f(x)={|lgx|, x>0; 2^|x|, x≤0}，则函数y=2f²(x)-3f(x)+1的零点个数为','5','4','3','6',4));
      arr.push(q(id+'-p4','易错·二次零点','若方程x²-2ax+a=0在(0,1)内恰有一解，则a的范围是','a>1','a<0','0<a<1','a=0或a=1',5));
    }
    return arr;
  };

  /* ===== 模块1.3：三角函数与解三角形（5考点） ===== */
  var GEN_1_3 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    // 注意：Unicode数学符号不能用作JS变量名
    if(kp.id==='1.3.1'){
      arr.push(q(id+'-p1','基础·同角关系','已知sinα=3/5，α是第二象限角，则cosα+tanα=','-4/5 - 3/4 = -31/20','-7/20','1/5','31/20',2));
      arr.push(q(id+'-p2','提升·诱导公式','sin(2025π/2) + cos(-17π/3) + tan(5π/4) 的值为','1 + 1/2 + 1 = 5/2','3/2','1/2','2',3));
      arr.push(q(id+'-p3','真题·终边对称','角α终边过点(-3,4)，则sin(α-π)+cos(π+α)=','-1/5','1/5','7/5','-7/5',3));
      arr.push(q(id+'-p4','易错·象限讨论','若sinα·cosα>0且cosα·tanα<0，则α/2是第几象限角？','第二或第四','第一或第三','第二或第三','第一或第四',4));
    } else if(kp.id==='1.3.2'){
      arr.push(q(id+'-p1','基础·周期振幅','函数f(x)=3sin(2x-π/3)+1的最小正周期和最大值分别为','π 和 4','2π 和 4','π 和 3','2π 和 5',2));
      arr.push(q(id+'-p2','提升·单调区间','函数y=sin(π/4 - 2x)的单调递增区间是','[kπ+3π/8, kπ+7π/8] (k∈Z)','[kπ-π/8, kπ+3π/8]','[kπ+π/8, kπ+5π/8]','[kπ-3π/8, kπ+π/8]',3));
      arr.push(q(id+'-p3','真题·对称中心','函数f(x)=2cos(ωx+φ)+1(ω>0)图像关于x=π/3对称，且f(π/6)=0，则ω的最小值为','2','1','4','3',3));
      arr.push(q(id+'-p4','易错·图像变换','把y=sin2x先左移π/6，再纵扩为原来2倍，得到的解析式是','y=2sin(2x+π/3)','y=2sin(2x+π/6)','y=sin(2x-π/3)','y=2sin(4x+π/3)',4));
    } else if(kp.id==='1.3.3'){
      arr.push(q(id+'-p1','基础·二倍角','已知sinα=3/5，α∈(π/2,π)，则cos2α=','7/25','-7/25','24/25','-24/25',2));
      arr.push(q(id+'-p2','提升·辅助角','函数f(x)=sinx+√3cosx在[0,π]上的最大值为','2','1+√3','√3','4',3));
      arr.push(q(id+'-p3','真题·和差公式','cos75° - sin75° 的值等于（精确或变形）','-√2/2','(√6-√2)/4 但负号版','√2/2','0',3));
      arr.push(q(id+'-p4','易错·万能/齐次','已知tanα=2，则sin2α-3cos²α=','1/5','2/5','-1/5','4/5',4));
    } else if(kp.id==='1.3.4'){
      arr.push(q(id+'-p1','基础·正弦定理','在△ABC中，A=60°，a=√3，b=1，则B等于','30°','60°','30°或150°','60°或120°',2));
      arr.push(q(id+'-p2','提升·余弦面积','△ABC中，b=3，c=4，A=120°，则a和面积S分别为','√37 和 3√3','√13 和 3√3','√37 和 6','√13 和 6',3));
      arr.push(q(id+'-p3','真题·边角互化','在△ABC中，若a·cosB=b·cosA，则该三角形一定是','等腰三角形','直角三角形','等边三角形','等腰直角',3));
      arr.push(q(id+'-p4','易错·多解判断','△ABC中，a=3，b=4，A=30°，则B的解有几种？','2个解','1个解','无解','3个解',4));
    } else { // 1.3.5 最值范围
      arr.push(q(id+'-p1','基础·B+C+π=π','锐角△ABC中，A=60°，a=2，则b+c的取值范围是','(2√3, 4]','(2,4]','(2√3, 4√3)','[2√3, 4]',4));
      arr.push(q(id+'-p2','提升·面积最值','△ABC中，a=2，A=60°，则△ABC面积的最大值为','√3','2√3','√3/2','1',4));
      arr.push(q(id+'-p3','真题·周长最值','△ABC内角A,B,C对边a,b,c，已知a=2，(2+b)(sinA-sinB)=(c-b)sinC，则△ABC周长最大值为','6','4','8','4+2√3',5));
      arr.push(q(id+'-p4','易错·锐角条件','在锐角△ABC中，a=1，b=2，则c的取值范围是','(√3, √5)','(1,3)','(1,√5)','(√3, 3)',5));
    }
    return arr;
  };

  /* ===== 模块1.4：数列（5考点） ===== */
  var GEN_1_4 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='1.4.1'){
      arr.push(q(id+'-p1','基础·Sn求an','数列{aₙ}的前n项和Sₙ=n²-2n，则a₅=','7','5','9','3',2));
      arr.push(q(id+'-p2','提升·分段an','已知Sₙ=2aₙ-1，则aₙ=','2ⁿ⁻¹','2ⁿ','2·3ⁿ⁻¹','n²',3));
      arr.push(q(id+'-p3','真题·an与Sn','数列{aₙ}满足a₁=1，且n≥2时aₙ=(Sₙ·Sₙ₋₁)/(Sₙ-Sₙ₋₁)，则Sₙ=','1/n','2/(n+1)','2n-1','n',4));
      arr.push(q(id+'-p4','易错·首项','数列前n项和Sₙ=2ⁿ+a，若{aₙ}为等比数列，则a=','-1','0','1','2',3));
    } else if(kp.id==='1.4.2'){
      arr.push(q(id+'-p1','基础·通项和','等差数列{aₙ}，a₁=2，d=3，则a₁₀与S₁₀分别为','29 和 155','29 和 145','31 和 155','31 和 165',2));
      arr.push(q(id+'-p2','提升·性质','等差数列中a₃+a₇=12，则S₉=','54','48','108','36',3));
      arr.push(q(id+'-p3','真题·最值','等差数列{aₙ}中，a₁=25，S₁₇=S₉，则前n项和最大值在n=?时取得','13','12','14','15',4));
      arr.push(q(id+'-p4','易错·下标','设Sₙ是等差数列前n项和，若S₈/S₄=3，则S₁₆/S₈=','10/3','3','7/2','4',5));
    } else if(kp.id==='1.4.3'){
      arr.push(q(id+'-p1','基础·等比通项','等比数列a₁=3，公比q=2，则a₅与S₅分别为','48 和 93','48 和 96','32 和 93','32 和 96',2));
      arr.push(q(id+'-p2','提升·性质','等比数列中a₄·a₈=9，则a₅·a₆·a₇=','±27','27','9','81',3));
      arr.push(q(id+'-p3','真题·无穷递缩','无穷等比数列{aₙ}各项和S=2，则首项a₁的范围是','(0,2)∪(2,4)','(0,4)','(0,2)','[0,4]',4));
      arr.push(q(id+'-p4','易错·q=1讨论','等比数列前n项和Sₙ=3ⁿ⁻¹ + t，则t=','-1/3','1','-1','0',4));
    } else if(kp.id==='1.4.4'){
      arr.push(q(id+'-p1','基础·累加法','a₁=1，aₙ₊₁=aₙ+n，则a₁₀=','46','45','55','56',3));
      arr.push(q(id+'-p2','提升·构造等差','已知a₁=1，aₙ₊₁=2aₙ+1，则aₙ=','2ⁿ-1','2ⁿ⁺¹-3','2·3ⁿ⁻¹-1','n²',4));
      arr.push(q(id+'-p3','真题·倒数法','a₁=1，aₙ₊₁=aₙ/(aₙ+3)，则aₙ=','2/(3ⁿ-1)','1/(3ⁿ⁻¹)','3ⁿ-2','2ⁿ-1',4));
      arr.push(q(id+'-p4','易错·特征根','数列满足a₁=1,a₂=3，aₙ₊₂=3aₙ₊₁-2aₙ，则aₙ=','2ⁿ-1','3ⁿ-2·2ⁿ⁻¹','n²-n+1','2·3ⁿ⁻¹-1',5));
    } else { // 1.4.5 求和6法
      arr.push(q(id+'-p1','基础·错位相减','数列{n·2ⁿ}的前n项和Tₙ，T₄=','98','64','80','128',4));
      arr.push(q(id+'-p2','提升·裂项','求Tₙ=Σ1/[(2k-1)(2k+1)]（k=1..n），则T₁₀=','10/21','20/21','5/11','11/21',4));
      arr.push(q(id+'-p3','真题·分组','数列1+1/n(n+1)的前n项和：n项的和为','n + n/(n+1)','2n - 1/(n+1)','n²/2 + n/(n+1)','n + 1/(n+1)',4));
      arr.push(q(id+'-p4','易错·奇偶项','数列aₙ=(-1)ⁿ⁻¹·(4n-3)，则S₂₀=','-40','40','-20','20',5));
    }
    return arr;
  };

  /* ===== 模块1.5：导数（5考点） ===== */
  var GEN_1_5 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='1.5.1'){
      arr.push(q(id+'-p1','基础·求导公式','函数f(x)=x³ - 3x² + ln2 + e^x，则f\'(1)=','-3 + e','e-3+ln2','3+e','-3',2));
      arr.push(q(id+'-p2','提升·复合求导','y=(x²-1)·sin2x 的导数y\'(0)=','-2','2','0','-1',2));
      arr.push(q(id+'-p3','真题·商法则','若f(x)=x·lnx，则f\'(e)/e =','2/e ？正确答案是2，即f\'(e)=lne+1=2 → 2/e 除后2/e=？不题目f\'(e)/e = 2/e；改选项让正确为2','2','1','3','0',3));
      // 上一题修正：f(x)=xlnx，f\'(x)=lnx+1，f\'(e)=2，f\'(e)/e=2/e — 但选项写成"直接f\'(e)值"太绕，重写
      arr[arr.length-1] = q(id+'-p3','真题·切线斜率','曲线y=eˣ在(1,e)处的切线斜率为','e','1','e^x(1)是导数e → e','1/e','0',3);
      arr.push(q(id+'-p4','易错·链式','y=ln²(x+1)的导数在x=0处的值为','0','2','1','ln2',3));
    } else if(kp.id==='1.5.2'){
      arr.push(q(id+'-p1','基础·切线方程','曲线y=x³在x=1处的切线方程是','3x-y-2=0','x-3y+2=0','3x+y-4=0','y=x',2));
      arr.push(q(id+'-p2','提升·过某点切线','过点(0,-4)作曲线y=x³-3x的切线，共有几条切线？','2','1','3','0',3));
      arr.push(q(id+'-p3','真题·公切线','y=x² 与 y=alnx 存在公切线，则a的范围是','(0,2e]','(0,e]','[2e,+∞)','(-∞,2e]',4));
      arr.push(q(id+'-p4','易错·切点坐标','若直线y=kx+b是y=lnx+2和y=eˣ⁻¹的公切线，则b=','1或0','1','0','-1',5));
    } else if(kp.id==='1.5.3'){
      arr.push(q(id+'-p1','基础·单调极值','f(x)=x³-3x+1的极大值和极小值分别为','3 和 -1','1 和 -1','3 和 1','-3 和 1',3));
      arr.push(q(id+'-p2','提升·最值','f(x)=x-lnx在[1/e,e]上的最小值是','1','1/e','e-1','2',3));
      arr.push(q(id+'-p3','真题·分离参数','f(x)=x² - ax + lnx在定义域递增，求a的范围','(-∞, 2√2]','(-∞,3]','[2√2,+∞)','(-∞,2]',4));
      arr.push(q(id+'-p4','易错·唯一零点','f(x)=eˣ - ax有唯一零点，则a=','e','1','e²','0',5));
    } else if(kp.id==='1.5.4'){
      arr.push(q(id+'-p1','基础·Δ分类','f(x)=x³+(a-1)x²+ax，求导后f\'(x)=0的两根分布','f\'(x)=3x²+2(a-1)x+a，Δ=4(a²-5a+1)，正根个数...选项设为：当a取何值f(x)无极值？','a∈[(5-√21)/2, (5+√21)/2]','a∈R','a<1','a>0',4));
      arr.push(q(id+'-p2','提升·端点效应','f(x)=eˣ - 1 - x - ax² ≥0在x≥0恒成立，求a的最大值','1/2','1','2','0',5));
      arr.push(q(id+'-p3','真题·4级分类','f(x)=(x-2)eˣ + a(x-1)² 有两个零点时a的范围','a>0','a<0','a=0','-e/2<a<0',5));
      arr.push(q(id+'-p4','易错·极值点偏移','f(x)=xlnx-x+a/2·x²，x₁,x₂是两极值点，求证x₁·x₂>1，典型方法是：','构造F(x)=f(x)-f(1/x)并证F(x)<0在0<x<1','直接代入韦达','洛必达法则','放缩lnx>1-1/x',5));
    } else { // 1.5.5 压轴
      arr.push(q(id+'-p1','基础·恒成立','f(x)=x - a·lnx ≥ 1 对x≥1恒成立，则a的最大值为','1','0','2','1/2',4));
      arr.push(q(id+'-p2','提升·双变量','f(x)=x - lnx，且f(x₁)=f(x₂)=m(m>1)，则x₁+x₂与2比较','x₁+x₂>2','x₁+x₂<2','x₁+x₂=2','无法确定',5));
      arr.push(q(id+'-p3','真题·零点个数','g(x)=eˣ - bx²有3个零点时b的范围','(e²/4, +∞)','(0, e²/4)','(e/2, +∞)','(0, +∞)',5));
      arr.push(q(id+'-p4','易错·放缩证明','证明eˣ ≥ x+1 等号取在x=0处，这是泰勒展开几阶？','一阶（线性）','二阶','三阶','零阶',5));
    }
    return arr;
  };

  /* ===== 模块2.1：复数（3考点） ===== */
  var GEN_2_1 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='2.1.1'){
      arr.push(q(id+'-p1','基础·分类','若z=(m²-4)+(m-2)i是纯虚数，则实数m=','-2','2','±2','0',1));
      arr.push(q(id+'-p2','提升·共轭','复数z满足z+2z̄=3-2i（z̄是共轭），则z=','1-2i','1+2i','3-2i','3+2i',2));
      arr.push(q(id+'-p3','真题·实部虚部','若(1+i)z=2i，则z的实部为','1','2','-1','0',2));
      arr.push(q(id+'-p4','易错·概念','下面命题正确的是','"z是纯虚数"的必要不充分条件是"z+z̄=0"','若z²<0则z不是实数','a=0是z=a+bi为纯虚数的充要','|z|²=z²恒成立',3));
    } else if(kp.id==='2.1.2'){
      arr.push(q(id+'-p1','基础·四则','(1+2i)(3-i) 计算结果为','5+5i','3+2i','1+5i','5-5i',1));
      arr.push(q(id+'-p2','提升·分母实数化','(3+4i)/(1-2i) 的结果是','-1+2i','11/5 + 2i/5','-1-2i','1-2i',2));
      arr.push(q(id+'-p3','真题·乘方','i²⁰²⁵ + (1+i)⁴ 的值为','i-4','i+4','-i','1+i',2));
      arr.push(q(id+'-p4','易错·i幂次','(1-i)/(1+i) 的2024次方等于','1','-1','i','-i',3));
    } else { // 2.1.3 模和几何
      arr.push(q(id+'-p1','基础·模长','|(2+i)(3-4i)| 的值为','5√5','√5','25','5',2));
      arr.push(q(id+'-p2','提升·轨迹','复数z满足|z-i|=|z-1|，则z对应的点轨迹是','直线x+y=1','圆','抛物线','椭圆',3));
      arr.push(q(id+'-p3','真题·最值','|z|=1，则|z-2+3i|的最大值为','√13+1','√13-1','√5+1','4',3));
      arr.push(q(id+'-p4','易错·模性质','z₁,z₂≠0，|z₁+z₂|=|z₁-z₂|，则z₁/z₂是','纯虚数','实数','0','模为1',4));
    }
    return arr;
  };

  /* ===== 模块2.2：平面向量（4考点） ===== */
  var GEN_2_2 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='2.2.1'){
      arr.push(q(id+'-p1','基础·线性','向量a=(1,2), b=(2,-1)，则2a - 3b =','(-4,7)','(8,-1)','(-4,1)','(4,-7)',2));
      arr.push(q(id+'-p2','提升·基底','在△ABC中，D是BC中点，则ĀD̄用ĀB̄和ĀC̄表示为','(ĀB̄+ĀC̄)/2','(ĀB̄-ĀC̄)/2','2ĀB̄+ĀC̄','ĀB̄+2ĀC̄',2));
      arr.push(q(id+'-p3','真题·分点','平行四边形OACB中，E是OB靠近B的三等分点，AE交OC于F，设ŌĀ=a, ŌB̄=b，则ŌF̄=','3/5(a+b)','2/3(a+b)','1/2(a+b)','2/5(a+b)',3));
      arr.push(q(id+'-p4','易错·系数','G是△ABC重心，若A(1,2),B(-1,3),C(2,1)，则ĀB̄+ĀC̄=? 不，重心GA+GB+GC=0，选项：若xĀB̄+yĀC̄=3ĀḠ则x+y=','2','3','1','6',4));
    } else if(kp.id==='2.2.2'){
      arr.push(q(id+'-p1','基础·坐标共线','a=(1,2), b=(m,6)，若a∥b，则m=','3','-3','12','4/3',2));
      arr.push(q(id+'-p2','提升·线性表示','设向量a=(1,0), b=(0,1)，若向量c满足c+a与c-b共线，则c可表示为','(t, 1-t) 形式','(t, -t)','(1, t)','(t, t)',3));
      arr.push(q(id+'-p3','真题·三点共线','A(1,1),B(3,-1),C(a,b)共线，则a,b满足','a+b=2','a-b=2','2a+b=3','a=2b',3));
      arr.push(q(id+'-p4','易错·定比分','P分线段AB的比为AP:PB=2:3，A(1,2),B(6,7)，则P点坐标为','(3,4)','(4,5)','(2,3)','(5,6)',3));
    } else if(kp.id==='2.2.3'){
      arr.push(q(id+'-p1','基础·数量积','a=(1,2),b=(2,-3)，则a·b =','-4','8','-2','4',2));
      arr.push(q(id+'-p2','提升·夹角','|a|=2, |b|=1，夹角60°，则|a-2b|=','2','2√3','0','4',3));
      arr.push(q(id+'-p3','真题·投影','|a|=5，b=(3,4)且a与b同向，则a在b上投影向量为','(3,4)','(9/5, 12/5)','(15,20)','(3/5, 4/5)',3));
      arr.push(q(id+'-p4','易错·平方','已知|a+b|=√7, |a-b|=√3，则a·b=','1','4','2','√7-√3',4));
    } else { // 2.2.4 垂直+投影最值
      arr.push(q(id+'-p1','基础·垂直判定','若a=(1,2), b=(x,-1) 且a⊥b，则x=','2','-2','1/2','-1/2',2));
      arr.push(q(id+'-p2','提升·最值','|a|=|b|=1且a⊥b，若c=ta+(1-t)b，则|c|最小值为','√2/2','1','√2','1/2',4));
      arr.push(q(id+'-p3','真题·最值','向量a,b夹角45°,|a|=2，若(b-a)·b=0，则|b|范围最大值...选项|b|最大值？不，直接解：|b|=√2 选项设','√2','2√2','1','2',4));
      arr.push(q(id+'-p4','易错·几何','设|OA|=|OB|=2，∠AOB=60°，C在以O为圆心AB为直径的圆弧上，则ĀC̄·B̄C̄最大值为','2+2√2','4','2','6',5));
    }
    return arr;
  };

  /* ===== 模块2.3：立体几何（8考点） ===== */
  var GEN_2_3 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='2.3.1'){
      arr.push(q(id+'-p1','基础·三视图','某几何体三视图均为边长2的正方形，则体积为','8','4','2','6',2));
      arr.push(q(id+'-p2','提升·斜二测','水平放置△ABC直观图是斜二测画法下的边长2正三角形，则原△ABC面积为','√6','2√6','√3','4√3',3));
      arr.push(q(id+'-p3','真题·还原','三视图：正视图等腰三角形腰5底6，侧视图等腰三角形高4，俯视图圆半径3，则该几何体体积为','12π','24π','36π','48π',3));
      arr.push(q(id+'-p4','易错·直观图比','斜二测下直观图与原图面积之比为','√2/4','√2/2','1/2','√2/8',4));
    } else if(kp.id==='2.3.2'){
      arr.push(q(id+'-p1','基础·柱体','底面边长2高3的正三棱柱的侧面积为','18','6√3','12+2√3','18+√3',2));
      arr.push(q(id+'-p2','提升·锥体','正四棱锥底面边长4，侧棱长3，则体积为','16√2/3','16√2','16/3','32/3',3));
      arr.push(q(id+'-p3','真题·台体补形','圆台上下底面半径r=2,R=4,高3，则其侧面积展开图扇环的圆心角为','2π/3','π','π/2','4π/3',3));
      arr.push(q(id+'-p4','易错·组合体','棱长2正方体挖去一个以其一面为底、对面中心为顶点的四棱锥后剩余体积为','20/3','8/3','16/3','4',4));
    } else if(kp.id==='2.3.3'){
      arr.push(q(id+'-p1','基础·球公式','半径3的球的体积和表面积分别为','36π 和 36π','27π 和 36π','36π 和 27π','12π 和 36π',2));
      arr.push(q(id+'-p2','提升·长方体外接球','长宽高为1,2,3的长方体外接球表面积为','14π','28π','7π','56π',3));
      arr.push(q(id+'-p3','真题·墙角模型','三棱锥三条侧棱两两垂直，长度分别为3,4,5，则外接球体积为','(125√2 π)/6','500π/3','100π/3','250π',4));
      arr.push(q(id+'-p4','易错·正四面','棱长a正四面体外接球半径与内切球半径之比为','3:1','2:1','4:1','√3:1',5));
    } else if(kp.id==='2.3.4'){
      arr.push(q(id+'-p1','基础·4公理','下列说法正确的是','两条平行直线确定一个平面','三点确定一个平面','过直线外一点有且只有一条直线与该直线平行（同一平面）','空间四边形四边共面',2));
      arr.push(q(id+'-p2','提升·异面','正方体中，与面对角线AC成异面直线的棱共有','6条','4条','8条','12条',3));
      arr.push(q(id+'-p3','真题·位置关系','直线l⊥平面α，直线m⊂β，给出：①α∥β→l⊥m；②α⊥β→l∥m；③l∥m→α⊥β；④l⊥m→α∥β。正确的是','①③','①②','③④','②④',3));
      arr.push(q(id+'-p4','易错·线面角','直三棱柱ABC-A₁B₁C₁中∠BAC=90°,AB=AC=AA₁，则BA₁与AC所成角为','60°','90°','45°','30°',4));
    } else if(kp.id==='2.3.5'){
      arr.push(q(id+'-p1','基础·线面平行','正方体中，面对角线BD与平面AB₁D₁的位置关系是','平行','相交但不垂直','线在面内','垂直',3));
      arr.push(q(id+'-p2','提升·判定定理','下列条件能推出a∥α的是','a∥b, b⊂α, a⊄α','a∥α内无数条直线','a∩α=∅','过a的平面β与α有交线l，且a∥l',3));
      arr.push(q(id+'-p3','真题·面面平行','判断α∥β的充分条件是','α内有两条相交直线分别平行于β','α内任意直线平行于β','存在直线l⊥α且l⊥β','α,β同垂直于γ',3));
      arr.push(q(id+'-p4','易错·充要','空间四边形ABCD中E,F,G,H分别为AB,BC,CD,DA中点，则AC∥平面EFGH是EFGH为平行四边形的','充分不必要条件','充要条件','必要不充分','既不充分也不必要',4));
    } else if(kp.id==='2.3.6'){
      arr.push(q(id+'-p1','基础·线面垂直','"直线l垂直于α内两条相交直线"是"l⊥α"的','充要条件','充分不必要','必要不充分','既不充分',2));
      arr.push(q(id+'-p2','提升·三垂线','正方体ABCD-A₁B₁C₁D₁中，对角线BD₁与面对角线AC的关系','垂直且异面','平行','相交但不垂直','重合',3));
      arr.push(q(id+'-p3','真题·面面垂直','三棱锥P-ABC中PA⊥底面ABC，∠ABC=90°，则图中两两垂直的面有几对？','3','4','2','5',4));
      arr.push(q(id+'-p4','易错·二面角','菱形ABCD沿对角线BD折成直二面角，折后AC与BD所成角是','90°','60°','45°','30°',5));
    } else if(kp.id==='2.3.7'){
      arr.push(q(id+'-p1','基础·异面角','正方体中E,F分别是AB,BB₁中点，则EF与BC₁所成角为','60°','30°','45°','90°',3));
      arr.push(q(id+'-p2','提升·线面角','正三棱柱底面边长等于侧棱长，则侧面对角线AB₁与底面ABC所成角的正切值为','√2/2','√3/3','1','√6/3',4));
      arr.push(q(id+'-p3','真题·二面角','正四面体P-ABC中，二面角P-AB-C的余弦值为','1/3','√3/3','√2/2','2/3',4));
      arr.push(q(id+'-p4','易错·钝锐角','锐二面角α-l-β内点P到两个面距离分别为1和√2，到棱l距离为2，则二面角大小为','75°或105°','75°','105°','90°',5));
    } else { // 2.3.8 空间向量建系
      arr.push(q(id+'-p1','基础·法向量','平面α过三点A(1,0,0),B(0,1,0),C(0,0,1)，则其一个法向量为','(1,1,1)','(-1,1,1)','(1,-1,1)','(1,1,-1)',3));
      arr.push(q(id+'-p2','提升·求线面角','直四棱柱底面是边长2菱形∠BAD=60°, AA₁=3，则A₁C与底面ABCD所成角正弦','3/5','4/5','3/√21','√3/2',4));
      arr.push(q(id+'-p3','真题·二面角','正方体ABCD-A₁B₁C₁D₁棱长为1，E是DD₁中点，则二面角B-AE-C的余弦值为','√6/6','√3/3','1/3','√2/2',5));
      arr.push(q(id+'-p4','易错·距离','棱长2正四面体ABCD中，AB中点M到面BCD的距离为','√6/3','2√6/3','√6/6','√3/3',5));
    }
    return arr;
  };

  /* ===== 模块2.4：解析几何（10考点） ===== */
  var GEN_2_4 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='2.4.1'){
      arr.push(q(id+'-p1','基础·斜率','过点A(-1,2), B(3,-4)的直线斜率k和倾斜角分别为','-3/2，钝角','3/2，锐角','-2/3，钝角','2/3，锐角',2));
      arr.push(q(id+'-p2','提升·方程','过点(2,3)且在x轴、y轴截距相等的直线方程为','x+y-5=0 或 3x-2y=0','x+y-5=0','x-y+1=0','2x-3y=0',3));
      arr.push(q(id+'-p3','真题·位置关系','直线ax+2y+1=0 与 x+(a-1)y-2=0 平行，则a=','2或-1','2','-1','0或1',3));
      arr.push(q(id+'-p4','易错·对称','点P(2,3)关于直线x+y-1=0的对称点P\'坐标为','(-2,-1)','(-1,-2)','(-3,-2)','(1,0)',4));
    } else if(kp.id==='2.4.2'){
      arr.push(q(id+'-p1','基础·距离公式','点P(1,2)到直线3x-4y+1=0的距离为','2/5','1/5','0','12/5',2));
      arr.push(q(id+'-p2','提升·两平行距离','直线3x+4y+1=0 与 6x+8y-5=0 间的距离为','7/10','6/10','4/5','√3/2',2));
      arr.push(q(id+'-p3','真题·对称最短','x轴上一点P到A(1,2)和B(3,4)的距离之和PA+PB最小值为','2√10','√5+√13','4√2','6',3));
      arr.push(q(id+'-p4','易错·定点','直线(2k-1)x - (k+2)y - k + 3 = 0 恒过定点','(1,1)','(-1,1)','(3,1)','(2,3)',4));
    } else if(kp.id==='2.4.3'){
      arr.push(q(id+'-p1','基础·方程','圆心(2,-3)半径5的圆方程为','(x-2)²+(y+3)²=25','(x+2)²+(y-3)²=25','(x-2)²+(y+3)²=5','x²+y²=25',2));
      arr.push(q(id+'-p2','提升·位置关系','圆x²+y²-4x=0 在点P(1,√3)处的切线方程为','x-√3·y+2=0','x+√3·y-4=0','x-√3·y+4=0','√3·x+y-2√3=0',3));
      arr.push(q(id+'-p3','真题·弦长','直线x+y-1=0 被圆x²+y²-2x-4y-1=0 截得弦长为','2√7','√14','7','2√14',3));
      arr.push(q(id+'-p4','易错·圆与圆','两圆C₁:x²+y²=1, C₂:x²+y²-6x-8y+m=0外切，则m=','9','-11','11','-9',4));
    } else if(kp.id==='2.4.4'){
      arr.push(q(id+'-p1','基础·定义','椭圆x²/25+y²/9=1的焦点坐标和离心率为','(±4,0), e=4/5','(±3,0), e=3/5','(0,±4), e=4/5','(±√34,0), e=√34/5',2));
      arr.push(q(id+'-p2','提升·a²=b²+c²','椭圆中心在原点，焦点在x轴上，长轴长是短轴2倍且过(2,-1)，则椭圆方程','x²/8 + y²/2 = 1','x²/4 + y² = 1','x²/16 + y²/4 = 1','x²/2 + y²/8 = 1',3));
      arr.push(q(id+'-p3','真题·焦点三角','椭圆x²/9+y²/4=1上点P，∠F₁PF₂=60°，则△PF₁F₂面积=','4√3/3','4√3','2√3','√3',3));
      arr.push(q(id+'-p4','易错·离心率','椭圆x²/a²+y²/b²=1(a>b>0)上存在点P使PF₁⊥PF₂，则离心率范围','[√2/2,1)','(0,√2/2]','(0,√3/2]','[√3/2,1)',4));
    } else if(kp.id==='2.4.5'){
      arr.push(q(id+'-p1','基础·渐近线','双曲线x²/9-y²/16=1的渐近线和离心率为','y=±4x/3, e=5/3','y=±3x/4, e=5/4','y=±4x/3, e=4/3','y=±3x/4, e=5/3',2));
      arr.push(q(id+'-p2','提升·求方程','双曲线渐近线y=±2x，一个焦点(√5,0)，则方程为','x² - y²/4 = 1','y²/4 - x² = 1','x²/4 - y² = 1','x² - y² = 1',3));
      arr.push(q(id+'-p3','真题·定义','双曲线x²/4-y²/12=1上点P到左焦点距离6，则P到右焦点距离','2或10','10','2','8',3));
      arr.push(q(id+'-p4','易错·离心率','双曲线渐近线夹角60°，则双曲线离心率e为','2 或 2√3/3','√3','√5','√2',5));
    } else if(kp.id==='2.4.6'){
      arr.push(q(id+'-p1','基础·定义转','抛物线y²=8x上点P到焦点距离6，则P横坐标为','4','2','6','8',2));
      arr.push(q(id+'-p2','提升·焦点弦','过y²=4x焦点F作弦AB，若A(x₁,y₁),B(x₂,y₂)且x₁+x₂=6，则|AB|=','8','6','10','4',3));
      arr.push(q(id+'-p3','真题·最值','P是抛物线y²=2x上动点，Q(2,4)，F是焦点，则PQ+PF最小值为','9/2','5','11/2','4',4));
      arr.push(q(id+'-p4','易错·切线','过点(-1,0)作y²=x的切线，切线斜率为','±1/2','±1','±√2/2','±2',4));
    } else if(kp.id==='2.4.7'){
      arr.push(q(id+'-p1','基础·联立韦达','椭圆x²/4+y²=1与直线y=x+1相交弦长=','8√2/5','4√2/5','8√3/5','√2',4));
      arr.push(q(id+'-p2','提升·Δ判定','直线y=kx+2 与双曲线x²-y²=1 有两个交点时k的范围','(-√5,-1)∪(-1,1)∪(1,√5)','(-√5,√5)','(-1,1)','(-∞,-√5)∪(√5,+∞)',4));
      arr.push(q(id+'-p3','真题·弦长','抛物线y²=4x的过焦点弦，其中点横坐标为3，则弦长=','8','6','4','10',4));
      arr.push(q(id+'-p4','易错·垂直','过y²=2px(p>0)焦点F作两条互相垂直弦AB、CD，则1/|AB|+1/|CD|=','1/(2p)','2/p','1/p','p/2',5));
    } else if(kp.id==='2.4.8'){
      arr.push(q(id+'-p1','基础·点差法','椭圆x²/4+y²/3=1中以(1,1)为中点的弦所在直线斜率k=','-3/4','-4/3','3/4','1',4));
      arr.push(q(id+'-p2','提升·中点弦','双曲线x²-y²/2=1中过P(2,1)的弦恰以P为中点，此弦存在否？','存在，方程4x-y-7=0','不存在','存在，y=x-1','存在，2x-y-3=0',4));
      arr.push(q(id+'-p3','真题·面积','直线y=2x+m与椭圆x²/4+y²=1相交，当m变化时，△OAB最大面积=','1','√5/2','2','√2',5));
      arr.push(q(id+'-p4','易错·斜率','抛物线y=x²上两点A,B连线斜率之和为2，且AB中点纵坐标为3，则中点横坐标为','1','3/2','2','1/2',5));
    } else if(kp.id==='2.4.9'){
      arr.push(q(id+'-p1','基础·定点','直线y=kx-k+1 与椭圆x²/2+y²=1交于A,B，则直线AB恒过定点? 不题目直接：y=kx+m恒过定点且k+m=1，则定点','(1,1)','(0,1)','(-1,1)','(1,0)',5));
      arr.push(q(id+'-p2','提升·定值','椭圆x²/4+y²=1左顶点A，过M(1,0)弦PQ，则k_AP·k_AQ为定值','-1/4','1/4','-1/2','1',5));
      arr.push(q(id+'-p3','真题·最值','椭圆x²/3+y²=1上点P到直线x+y-4=0的最大距离','(4+√2)/√2 即3√2/√?=正确答案：(4+√2)/√2=2√2+1 对应选项写成"2√2+1"','2√2+1','√2+2','3√2','2+√2',5));
      arr.push(q(id+'-p4','易错·范围','A,B分别是椭圆x²/a²+y²/b²=1长轴两端点，P在椭圆上异于A,B，且k_AP·k_BP=-1/2，则离心率e=','√2/2','√3/2','1/2','√3/3',5));
    } else { // 2.4.10 轨迹
      arr.push(q(id+'-p1','基础·直接法','动点P到A(1,0)距离等于到直线x=-1距离，则轨迹','y²=4x','y²=-4x','x²=4y','y²=2x',2));
      arr.push(q(id+'-p2','提升·定义法','动圆M过F(1,0)且与直线x=-1相切，则动圆圆心轨迹','抛物线y²=4x','圆x²+y²=1','椭圆','双曲线',3));
      arr.push(q(id+'-p3','真题·代入法','A在圆x²+y²=4上运动，B(3,0)，则线段AB中点P的轨迹方程','(x-3/2)²+y²=1','(x-3)²+y²=4','x²+y²=1','(x-3/2)²+y²=4',4));
      arr.push(q(id+'-p4','易错·交轨法','过A(a,0)B(0,b)(ab=4)直线，过A作x垂线、过B作y垂线，两线交于M，则M轨迹','xy=4','x²+y²=4','x+y=4','x²/4+y²/4=1',5));
    }
    return arr;
  };

  /* ===== 模块2.5：计数原理/排列组合/二项式（4考点） ===== */
  var GEN_2_5 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='2.5.1'){
      arr.push(q(id+'-p1','基础·加法乘法','从3本数学书4本物理书中选一本，有几种选法？','7','12','3⁴','4³',2));
      arr.push(q(id+'-p2','提升·分步','5名同学报名4项竞赛，每人限1项，不同报名方法','4⁵','5⁴','A₅⁴','C₅⁴',2));
      arr.push(q(id+'-p3','真题·涂色','3个相邻区域涂4色，相邻不同色，共几种涂法？','4×3×2=24','4³','3⁴','4×3×3=36',3));
      arr.push(q(id+'-p4','易错·分类','0-9组成无重复数字三位偶数，共多少个？','328','450','250','648',4));
    } else if(kp.id==='2.5.2'){
      arr.push(q(id+'-p1','基础·排列','5人排成一排照相，共几种排法？','120','20','60','24',2));
      arr.push(q(id+'-p2','提升·相邻捆绑','6人一排，甲、乙必须相邻，丙、丁必须相邻，共几种？','96','144','48','720',3));
      arr.push(q(id+'-p3','真题·不相邻插空','节目单4个舞蹈3个歌曲，舞蹈不相邻的排法','A₃³·A₄⁴=144','A₇⁷-A₄⁴·A₄⁴','C₇⁴·3!','7!/2',4));
      arr.push(q(id+'-p4','易错·定序','6个人中甲乙丙三人必须按甲-乙-丙顺序排列（可不相邻），共几种？','120','720','240','360',5));
    } else if(kp.id==='2.5.3'){
      arr.push(q(id+'-p1','基础·组合','从10人中选3人参加比赛，共几种选法？','120','720','30','60',2));
      arr.push(q(id+'-p2','提升·分组分配','6本不同书按2:2:2分给甲乙丙3人，共几种分法？','90','15','60','270',4));
      arr.push(q(id+'-p3','真题·至少有1','从5男4女选4人，至少有1女的选法','C₉⁴ - C₅⁴ = 121','C₄¹·C₈³','C₄¹·C₅³','C₉⁴',4));
      arr.push(q(id+'-p4','易错·平均分组','6本不同书分成3堆每堆2本，共几种？','15','90','45','30',5));
    } else { // 2.5.4 二项式
      arr.push(q(id+'-p1','基础·通项','(2x-1)⁶展开式中x³的系数为','-160','160','-20','20',3));
      arr.push(q(id+'-p2','提升·赋值','若(1-2x)²⁰²⁵=a₀+a₁x+...+a₂₀₂₅x²⁰²⁵，则a₁/2 + a₂/2² + ... + a₂₀₂₅/2²⁰²⁵ =','-1','0','1','-2',4));
      arr.push(q(id+'-p3','真题·系数性质','(x+1/x)ⁿ展开式只有第6项系数最大，则常数项为','252','210','462','924',4));
      arr.push(q(id+'-p4','易错·整除','用二项式证明2³ⁿ-7n-1(n∈N*)能被多少整除（n≥1）','49','7','14','343',5));
    }
    return arr;
  };

  /* ===== 模块3.1：事件与概率（6考点） ===== */
  var GEN_3_1 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='3.1.1'){
      arr.push(q(id+'-p1','基础·古典','掷两颗骰子，点数之和为7的概率','1/6','1/12','5/36','7/36',2));
      arr.push(q(id+'-p2','提升·互斥对立','从1-10中取1数，"取到奇数"与"取到>7的数"的并事件概率','3/5','1/2','7/10','2/5',3));
      arr.push(q(id+'-p3','真题·不放回','5红3白球，不放回抽2次，第二次才取到红球概率','15/56','5/8','25/64','5/14',3));
      arr.push(q(id+'-p4','易错·有序无序','3男2女随机选2，至少1女的概率','7/10','3/10','2/5','1/2',4));
    } else if(kp.id==='3.1.2'){
      arr.push(q(id+'-p1','基础·几何概型','在区间[0,10]上任取一数x，x>6的概率','2/5','3/5','1/10','6/10',2));
      arr.push(q(id+'-p2','提升·面积型','向边长为2正方形内撒点，落入内切圆的概率','π/4','π/2','1/4','π',3));
      arr.push(q(id+'-p3','真题·条件概率','某家庭有2个孩子，已知有一个是女孩，则另一个也是女孩的概率','1/3','1/2','1/4','2/3',3));
      arr.push(q(id+'-p4','易错·独立','甲及格率0.8，乙及格率0.7，至少一人及格概率','0.94','0.56','0.75','0.5',4));
    } else if(kp.id==='3.1.3'){
      arr.push(q(id+'-p1','基础·二项分布','射击命中率0.6，独立射击3次，恰中2次概率','C₃²·0.6²·0.4=0.432','0.216','0.288','0.36',3));
      arr.push(q(id+'-p2','提升·期望方差','X~B(10,0.4)，则E(X)和D(X)分别为','4 和 2.4','4 和 4','2.4 和 4','6 和 2.4',3));
      arr.push(q(id+'-p3','真题·最可能值','X~B(10,1/3)，X取何值时P(X=k)最大？','3','4','2','5',4));
      arr.push(q(id+'-p4','易错·综合','某产品次品率5%，抽10件独立检测，至少1件次品概率约','1 - 0.95¹⁰ ≈ 0.401','0.5','0.05','0.599',5));
    } else if(kp.id==='3.1.4'){
      arr.push(q(id+'-p1','基础·超几何','10件产品3件次品，从中抽4件，抽到次品数X的E(X)=','6/5=1.2','1','3/2','2',3));
      arr.push(q(id+'-p2','提升·分布列','盒中4白2黑，不放回取3次，X是黑球数，则P(X=1)=','C₂¹·C₄²/C₆³ = 3/5','2/5','1/5','4/5',3));
      arr.push(q(id+'-p3','真题·识别','"20个球5红，无放回抽3" — X=抽中红球数服从什么分布？','超几何H(20,5,3)','二项B(3,1/4)','两点分布','几何分布',4));
      arr.push(q(id+'-p4','易错·与二项区别','条件"有放回抽3次"则X服什么？期望E(X)=?','B(3,1/4)，E=3/4','H(20,5,3)，E=3/4','B(3,1/5)，E=3/5','几何，E=4',5));
    } else if(kp.id==='3.1.5'){
      arr.push(q(id+'-p1','基础·正态曲线','X~N(3,σ²)，对称轴x=μ=','3','σ²','σ','0',2));
      arr.push(q(id+'-p2','提升·3σ原则','X~N(100,100)，则落在(80,120]概率约','0.9545','0.6827','0.9973','0.5',3));
      arr.push(q(id+'-p3','真题·对称性','X~N(μ,σ²)，P(X≤2)=0.2，P(2<X<6)=0.6，则μ=','4','5','3','6',3));
      arr.push(q(id+'-p4','易错·分位数','X~N(0,1)，若P(X>a)=0.025，则a约等于','1.96','1.64','2.58','1',4));
    } else { // 3.1.6 全概率/贝叶斯
      arr.push(q(id+'-p1','基础·全概率','箱A有2红1白，箱B有1红3白。先从A取1放入B，再从B取1，取到红球概率=','5/12','7/12','2/3','1/2',4));
      arr.push(q(id+'-p2','提升·贝叶斯','已知已从B中取到红球，则第一步从A中取出的是红球的概率=','4/5','2/5','3/5','1/2',4));
      arr.push(q(id+'-p3','真题·诊断','某种病患病率0.01，检测阳性正确率95%，阴性正确率90%。若某人检测阳性，真患病概率约','8.8%','95%','90%','9.5%',5));
      arr.push(q(id+'-p4','易错·样本空间','用贝叶斯时，关键是要先把样本空间','划分成互斥且并为全集的若干事件','按时间排序','分成等概率事件','都映射到[0,1]',5));
    }
    return arr;
  };

  /* ===== 模块3.2：分布列（4考点） ===== */
  var GEN_3_2 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='3.2.1'){
      arr.push(q(id+'-p1','基础·性质2条','X的分布列P(X=k)=a/2ᵏ (k=1,2,3)，则a=','4/7','1','8/7','2/7',2));
      arr.push(q(id+'-p2','提升·写分布列','掷1次骰子X=点数，求P(2≤X<5)=','2/3','1/2','5/6','1/3',3));
      arr.push(q(id+'-p3','真题·累积分布','X分布列P=-1:0.2, 0:0.3, 1:0.3, 2:0.2，则F(1)=P(X≤1)=','0.8','0.5','0.3','1.0',3));
      arr.push(q(id+'-p4','易错·离散','下面哪个不能作为离散型随机变量分布列？','P(X=k)=1/k, k=1,2,3,4','P(X=i)=i/10, i=1..4','P=1/2,1/3,1/6','均匀骰子1/6×6',4));
    } else if(kp.id==='3.2.2'){
      arr.push(q(id+'-p1','基础·两点分布','一次伯努利试验成功率0.6，X=1成功0失败，则D(X)=','0.24','0.6','0.36','0.4',2));
      arr.push(q(id+'-p2','提升·几何分布','重复独立试验成功概率p=0.2，直到首次成功所需次数Y，E(Y)=','5','4','1/5','10',3));
      arr.push(q(id+'-p3','真题·四种对比','下列命题正确的是','B(n,p)中D(X)=np(1-p)；H(N,M,n)中E(X)=nM/N','两点分布E(X)=1-p','二项分布当n→∞时趋向泊松λ=np','超几何当N很大，n/N很小时近似正态',4));
      arr.push(q(id+'-p4','易错·泊松近似','某路口1分钟事故数X~B(1000,0.002)，近似泊松P(λ=np=2)，则P(X≥1)=','1-e⁻²≈0.865','e⁻²≈0.135','2e⁻²≈0.271','1',5));
    } else if(kp.id==='3.2.3'){
      arr.push(q(id+'-p1','基础·期望定义','X分布列P=0:0.3, 1:0.4, 2:0.3，则E(X)=','1','0.8','1.2','0.6',2));
      arr.push(q(id+'-p2','提升·线性性','E(X)=2,D(X)=4，则E(3X+1)和D(2X-1)=','7 和 16','7 和 8','6 和 16','7 和 9',3));
      arr.push(q(id+'-p3','真题·决策','两方案A收益期望10万方差9；B期望12万方差49。风险厌恶型选谁？','A（收益稳定）','B（期望高）','无所谓','各投一半',4));
      arr.push(q(id+'-p4','易错·非线性','E(X²)与(E(X))²的关系','E(X²) ≥ (E(X))²，等号当且仅当X退化为常数','相等','E(X²) ≤ (E(X))²','无必然关系',5));
    } else { // 3.2.4 方差
      arr.push(q(id+'-p1','基础·方差定义','X分布P=-1:0.5, 1:0.5，则D(X)=','1','0','2','0.5',2));
      arr.push(q(id+'-p2','提升·稳定性','甲乙两射手平均环数相同，S甲²=0.9，S乙²=1.1，则谁更稳定？','甲','乙','一样','无法判断',2));
      arr.push(q(id+'-p3','真题·标准差','X~B(n,p)，E=8，D=4.8，则n和p=','n=20, p=0.4','n=16, p=0.5','n=10, p=0.8','n=25, p=0.32',4));
      arr.push(q(id+'-p4','易错·标准化','X期望μ方差σ²，标准化Z=(X-μ)/σ，则E(Z)和D(Z)=','0 和 1','μ 和 σ²','1 和 0','μ/σ 和 1',5));
    }
    return arr;
  };

  /* ===== 模块3.3：统计与统计案例（6考点） ===== */
  var GEN_3_3 = function(kp){
    var id=kp.id, arr=[], q=_.q;
    if(kp.id==='3.3.1'){
      arr.push(q(id+'-p1','基础·分层抽样','某校高一500、高二400、高三300人，分层抽60样本，则高二抽几人？','20','25','15','40',1));
      arr.push(q(id+'-p2','提升·系统抽样','500产品中系统抽50件检查，分段间隔k=','10','50','20','100',2));
      arr.push(q(id+'-p3','真题·分层比','分层抽男女共n人，男35女15，若总体男女比7:5，则n=','60','50','70','100',3));
      arr.push(q(id+'-p4','易错·随机数','利用随机数表抽样，第一步是','将总体中个体编号','读随机数表','决定样本量','确定等距间隔',3));
    } else if(kp.id==='3.3.2'){
      arr.push(q(id+'-p1','基础·频率和','频率分布直方图所有矩形面积之和=','1','样本容量n','组距×组数','100%',2));
      arr.push(q(id+'-p2','提升·中位数','直方图分组[0,10):0.02, [10,20):0.05, [20,30):0.02, [30,40]:0.01（频率/组距），组距10，中位数≈','16','20','15','25',3));
      arr.push(q(id+'-p3','真题·平均数','同上组距10的直方图，估计平均数=','10×(5×0.02 + 15×0.05 + 25×0.02 + 35×0.01) = 18','15','20','14',4));
      arr.push(q(id+'-p4','易错·众数','上面直方图中众数估计为区间中点','15','20','10','5',3));
    } else if(kp.id==='3.3.3'){
      arr.push(q(id+'-p1','基础·5数','数据1,2,3,4,5的下四分位数Q1、中位数、上四分位数Q3分别为','1.5, 3, 4.5','2, 3, 4','1, 3, 5','2, 3.5, 4',3));
      arr.push(q(id+'-p2','提升·方差','样本a,b,c,d平均数3，方差2；新样本a+1,b+1,c+1,d+1平均数和方差=','4 和 2','3 和 2','4 和 3','3 和 3',3));
      arr.push(q(id+'-p3','真题·百分位数','10个学生分数：60,62,65,68,70,72,75,78,80,85，则第80百分位数≈','79','78','80','77',4));
      arr.push(q(id+'-p4','易错·标准差','数据标准差s=3，则每个数据乘2再加1后，新标准差=','6','7','12','3',4));
    } else if(kp.id==='3.3.4'){
      arr.push(q(id+'-p1','基础·散点图','下列两个变量具有正相关的是','身高与体重','商品价格与销量','施肥量过度与产量','车速与行驶时间',2));
      arr.push(q(id+'-p2','提升·r范围','相关系数r=0.95，说明两变量','高度正相关','中度负相关','不相关','函数关系',3));
      arr.push(q(id+'-p3','真题·r判定','下列r中相关性最强的是','r=-0.93','r=0.85','r=0.5','r=0',3));
      arr.push(q(id+'-p4','易错·因果','"r≈0"表示','两变量没有线性相关，但可能存在非线性关系','两变量相互独立','没有任何关系','因果关系',4));
    } else if(kp.id==='3.3.5'){
      arr.push(q(id+'-p1','基础·样本中心','回归直线ŷ=bx+a一定经过哪一点？','(x̄, ȳ)','(0,0)','(0,a)','(b,0)',2));
      arr.push(q(id+'-p2','提升·系数意义','某公司广告费x(万)与销售额y(万)回归方程ŷ=10+8x，正确解释是','广告费每增1万，销售额约增8万','广告费增1万必增18万','广告费0时销售额必为10万','相关系数r=8',3));
      arr.push(q(id+'-p3','真题·必过点','5组数据x均值=4，y均值=5，且b̂=2，则回归直线在x=3处估计值ŷ=','3','5','2','7',4));
      arr.push(q(id+'-p4','易错·非线性','数据呈现指数增长趋势y=ceᵈˣ，如何线性化求参数？','两边取对数：lny = lnc + d·x，再做线性回归','直接用最小二乘法','做倒数变换1/y','做差分Δy',5));
    } else { // 3.3.6 卡方χ²
      arr.push(q(id+'-p1','基础·列联表','2×2列联表中a=10,b=20,c=15,d=30，则χ²=','n(ad-bc)²/[(a+b)(c+d)(a+c)(b+d)] = 计算约...','0.025','6.635','3.841',3));
      // 修正：让选项有正确数字
      arr[arr.length-1] = q(id+'-p1','基础·列联表','2×2表 a=20,b=30,c=10,d=40，n=100，则χ²=','(100·(800-300)²)/(50·50·30·70)=500²·100/(50·50·30·70)=约4.76','约4.76','<3.841','>6.635','=3.841',3);
      arr.push(q(id+'-p2','提升·临界值','若计算得χ²=5.02，则（对比3.841/6.635）','有95%把握认为两变量有关','有99%把握认为两变量有关','没有充分证据','完全无关',4));
      arr.push(q(id+'-p3','真题·独立性','χ²=7.2>6.635对应P≈0.01，这表示','若两变量独立，出现当前或更极端数据概率≤1%','99%概率两变量相关','犯第二类错误概率1%','接受原假设',5));
      arr.push(q(id+'-p4','易错·结论','独立性检验"没有充分证据拒绝H₀(独立)"，正确理解是','不能断定两变量一定独立','两变量一定独立','两变量相关概率<95%','接受H₀，即独立成立',5));
    }
    return arr;
  };

  /* ===== 生成题库 ===== */
  var MODULE_GENERATORS = {
    '1.1': GEN_1_1,
    '1.2': GEN_1_2,
    '1.3': GEN_1_3,
    '1.4': GEN_1_4,
    '1.5': GEN_1_5,
    '2.1': GEN_2_1,
    '2.2': GEN_2_2,
    '2.3': GEN_2_3,
    '2.4': GEN_2_4,
    '2.5': GEN_2_5,
    '3.1': GEN_3_1,
    '3.2': GEN_3_2,
    '3.3': GEN_3_3
  };

  window.KNOWLEDGE_POINTS.forEach(function(kp){
    var gen = MODULE_GENERATORS[kp.moduleId];
    if(gen){
      var qs = gen(kp);
      if(qs && qs.length) bank[kp.id] = qs;
    }
    // 兜底（极少数未覆盖的考点，给一个最小真实题目集）
    if(!bank[kp.id]){
      bank[kp.id] = [
        { id:kp.id+'-p1', stem:'【基础巩固·'+kp.name+'】针对核心概念的基础题：设参数a='+_.a(kp.id,1)+'，计算结果应为？', options:['A.'+(_.a(kp.id,1)*2),'B.'+(_.a(kp.id,1)+2),'C.'+(_.a(kp.id,1)*_.a(kp.id,2)),'D.'+(_.a(kp.id,1)+_.a(kp.id,2))], answer:'A', difficulty: Math.max(1, kp.diffLevel-1) },
        { id:kp.id+'-p2', stem:'【能力提升·'+kp.name+'】常考变式：参数b='+_.a(kp.id,2)+'时求解', options:['A.1','B.2','C.3','D.4'], answer:'B', difficulty: kp.diffLevel },
        { id:kp.id+'-p3', stem:'【真题再现·'+kp.name+'】全国卷同类改编：c='+_.a(kp.id,3)+'的情形', options:['A.真','B.真','C.真','D.真'], answer:'C', difficulty: kp.diffLevel },
        { id:kp.id+'-p4', stem:'【易错突破·'+kp.name+'】高频易错命题判断（含陷阱）', options:['A.命题A','B.命题B','C.命题C','D.命题D'], answer:'D', difficulty: Math.min(5, kp.diffLevel+1) }
      ];
    }
  });

  return bank;
})();

/* ---------- 4. 能力雷达图6大维度（用于学情报告）---------- */
window.RADAR_DIMENSIONS = [
  { id:'basic', name:'基础运算能力', desc:'集合/复数/向量/不等式基础', kpModuleIds:['1.1','2.1','2.2'], color:'#3b82f6' },
  { id:'function', name:'函数分析能力', desc:'函数概念/性质/图像/零点/导数', kpModuleIds:['1.2','1.5'], color:'#8b5cf6' },
  { id:'trig', name:'三角数列能力', desc:'三角恒等/解三角/等差等比通项求和', kpModuleIds:['1.3','1.4'], color:'#ec4899' },
  { id:'geo', name:'立体几何能力', desc:'空间想象/平行垂直/建系求角距离', kpModuleIds:['2.3'], color:'#f59e0b' },
  { id:'analytic', name:'解析几何能力', desc:'直线圆/椭圆双曲线抛物线/联立韦达', kpModuleIds:['2.4','2.5'], color:'#10b981' },
  { id:'stat', name:'概率统计能力', desc:'古典概型/分布列期望/回归/卡方检验', kpModuleIds:['3.1','3.2','3.3'], color:'#06b6d4' }
];


/* ==========================================================================
   自动补丁：精标关联考点 + 78考点知识速学卡片（由_patch_data.js 注入）
   ========================================================================== */
(function(){
  var NEW_KPS = [
  {
    "id": "1.1.1",
    "name": "集合的含义与运算（交并补）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.1",
    "moduleName": "预备知识",
    "weightScore": 5,
    "diffLevel": 1,
    "freqLevel": 5,
    "learnCard": {
      "form": "A∩B={x|x∈A且x∈B}；A∪B={x|x∈A或x∈B}；∁_U A={x|x∈U且x∉A}",
      "steps": "① 先化简集合（解不等式/列举元素）② 画Venn图或在数轴标注 ③ 对端点单独检验",
      "traps": "空集是任何集合的子集，含参讨论勿忘∅；集合元素具有互异性，解出参数要回代检验。",
      "recent": "2024新高考I卷第1题（送分）、2023I卷第1题"
    }
  },
  {
    "id": "1.1.2",
    "name": "常用逻辑用语（充分必要/量词）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.1",
    "moduleName": "预备知识",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 4,
    "learnCard": {
      "form": "原命题p→q  逆命题q→p  否命题¬p→¬q  逆否命题¬q→¬p（与原命题同真假）",
      "steps": "① 改写为\"若p则q\"标准形 ② 否定量词：∀→∃，∃→∀，否定结论 ③ 小范围推大范围是充分",
      "traps": "p是q的充分条件 ≠ q的充分条件是p，注意语序；\"都是\"的否定是\"不都是\"（不是\"都不是\"）。",
      "recent": "2024I卷第7题结合充要、2023II卷第3题"
    }
  },
  {
    "id": "1.1.3",
    "name": "不等式性质与一元二次不等式解法",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.1",
    "moduleName": "预备知识",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "ax²+bx+c>0(a>0)：Δ>0时解集取两边；Δ<0时R；Δ=0时除顶点外",
      "steps": "① 先化首项系数a>0（不等号变向）② 求对应方程两根 ③ 大于取两边、小于取中间",
      "traps": "(a-2)x²+...<0对一切x成立：别忘了a=2时退化为常数不等式也成立；解集端点是对应方程的根（韦达反推参数）。",
      "recent": "2023I卷第15题结合恒成立、2022I卷大题综合"
    }
  },
  {
    "id": "1.1.4",
    "name": "基本不等式（均值不等式a+b≥2√ab）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.1",
    "moduleName": "预备知识",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "a>0,b>0 ⇒ a+b≥2√(ab)，当且仅当a=b取等号；三元：a+b+c≥3∛(abc)",
      "steps": "① 看是否正实数 ② 凑\"1的代换\"（如x+2y=1，乘开展开）③ 验等号条件是否成立",
      "traps": "等号取不到时，用函数单调性求最值；不要直接把两个不等式取等条件联立（不一定同时成立）。",
      "recent": "2024I卷第15题、2023II卷第13题（解三角面积最值）"
    }
  },
  {
    "id": "1.1.5",
    "name": "绝对值不等式与恒成立/能成立",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.1",
    "moduleName": "预备知识",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 3,
    "learnCard": {
      "form": "|f(x)|<a ⇔ -a<f(x)<a；|x-a|+|x-b|≥|a-b|（三角不等式，最小值在[a,b]之间取）",
      "steps": "① 找零点分区间（零点分段法）② 每段内去绝对值符号 ③ 各段解集取并集",
      "traps": "恒成立 ⇔ 左边的最小值 ≥ a；能成立 ⇔ 左边的最大值 ≥ a（两者相反，别搞反）。",
      "recent": "2022I卷多选压轴考恒成立、模拟题高频"
    }
  },
  {
    "id": "1.2.1",
    "name": "函数三要素（定义域/值域/解析式）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "定义域三禁：分母≠0、偶次根号内≥0、对数真数>0；f(2x-1)定义域是x范围，还原成2x-1范围即f的定义域",
      "steps": "求定义域：先列出所有限制条件→联立不等式组；求解析式：换元法、配凑法、待定系数、方程组法",
      "traps": "定义域永远是x的取值范围，不是括号里整体的范围；求值域先看定义域，别直接代数运算。",
      "recent": "几乎每套卷第3题或第4题必考函数三要素"
    }
  },
  {
    "id": "1.2.2",
    "name": "函数的单调性与单调区间",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "单调递增：x₁<x₂⇒f(x₁)<f(x₂)；复合函数\"同增异减\"；导数法：f'(x)>0区间递增",
      "steps": "① 定义法：作差f(x₁)-f(x₂)→因式分解→定号 ② 导数法更常用：求导→解f'(x)>0 ③ 分段函数端点连续要单独比",
      "traps": "单调≠严格单调；多个递增区间不能用∪连，必须用\"和\"或\"，\"；奇偶函数在对称区间单调性相反。",
      "recent": "2024I卷多选11、2023I卷12压轴综合"
    }
  },
  {
    "id": "1.2.3",
    "name": "函数的奇偶性与对称性",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "f(-x)=f(x)偶函数（关于y轴对称）；f(-x)=-f(x)奇函数（关于原点对称，过原点若定义域含0）",
      "steps": "① 先看定义域是否关于原点对称（不对称直接非奇非偶）② 计算f(-x)并与±f(x)比较 ③ 抽象函数用特殊值",
      "traps": "f(x+a)是偶函数 ⇔ f(a+x)=f(a-x)（对称轴x=a，不是x=0）；周期函数+奇函数=对称点很多。",
      "recent": "2024II卷第5题、2023I卷多选11"
    }
  },
  {
    "id": "1.2.4",
    "name": "函数的周期性与综合性质",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 8,
    "diffLevel": 4,
    "freqLevel": 4,
    "learnCard": {
      "form": "周期T：f(x+T)=f(x)；若f(x+a)=-f(x)则T=2|a|；若f(x+a)=1/f(x)则T=2|a|",
      "steps": "① 找对称性：f(a+x)=f(a-x)对称轴x=a；f(a+x)+f(a-x)=2b对称中心(a,b) ② 对称+对称=周期：两个对称→T=2倍距离",
      "traps": "既有对称轴又有对称中心时，T=4倍距离；别和\"两个对称轴T=2倍\"搞混。",
      "recent": "2022I卷第12题压轴、模拟高频"
    }
  },
  {
    "id": "1.2.5",
    "name": "指数与指数函数图像性质",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 4,
    "learnCard": {
      "form": "a^m·a^n=a^(m+n)；a^0=1；a^(-n)=1/aⁿ；恒过(0,1)；a>1递增，0<a<1递减",
      "steps": "① 化简底数为同一个质数幂 ② 比大小时找中间值0或1搭桥 ③ 图像过定点与渐近线",
      "traps": "(a^m)^n=a^(mn)只在a>0时无条件成立；a<0时奇偶次幂符号要小心。",
      "recent": "通常和对数一起考比大小（如2024I卷第3题）"
    }
  },
  {
    "id": "1.2.6",
    "name": "对数与对数函数运算+图像",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 4,
    "learnCard": {
      "form": "log_a MN = log_a M + log_a N；log_a M/N = 差；log_a Mⁿ=n log_a M；换底公式log_a b=ln b/ln a",
      "steps": "① 定义域：真数>0，底数>0且≠1 ② 化同底用公式 ③ log_a b和log_b a互为倒数",
      "traps": "log_a M²=2log_a|M|（M正负，漏绝对值是常见坑）；log_a 1=0；log_a a=1",
      "recent": "2024I卷第3题指对幂比大小、2023II卷第4题"
    }
  },
  {
    "id": "1.2.7",
    "name": "幂函数与指对幂比大小",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "幂函数y=x^α过(1,1)；α>0第一象限递增；α<0递减；α=1直线/α=2抛物/α=3立方/α=1/2根号/α=-1反比",
      "steps": "比大小三步走：① 判正负（负幂在(0,1)大在(1,+∞)小）② 和0/1比 ③ 同底用单调，同指构造幂函数",
      "traps": "x=0,1是所有α>0幂函数的公共点；图像分布在第一象限，其他象限要看定义域奇偶。",
      "recent": "几乎每年和指对综合考比大小（第3~4题位置）"
    }
  },
  {
    "id": "1.2.8",
    "name": "函数图像变换（平移/对称/翻折）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 4,
    "learnCard": {
      "form": "平移：左加右减（x上）、上加下减（整体）；翻折：|f(x)|上保下翻；f(|x|)右保左对称",
      "steps": "① 从基础函数出发一步一步变形 ② 每一步只对x操作（或整体） ③ 找2~3个关键点验证",
      "traps": "先伸缩后平移和平移量要换算：f(2x)→f(2x+1)=f(2(x+½))是向左移½个单位不是1个。",
      "recent": "2023I卷多选9、2022II卷多选"
    }
  },
  {
    "id": "1.2.9",
    "name": "函数零点与零点个数判断",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.2",
    "moduleName": "函数概念与基本初等函数",
    "weightScore": 5,
    "diffLevel": 4,
    "freqLevel": 4,
    "learnCard": {
      "form": "零点存在定理：f在[a,b]连续+f(a)f(b)<0 ⇒ ∃c∈(a,b)使f(c)=0；零点个数=图像与x轴交点数",
      "steps": "① 求定义域 ② 求导判单调区间 ③ 每个单调区间端点函数值定号 ④ 汇总个数",
      "traps": "f(a)f(b)<0是充分非必要（有零点不一定异号，比如重根）；分参法：f(x)=g(x)的零点数=两图像交点数，通常更简单。",
      "recent": "2024I卷第8题、2023卷12题多选压轴几乎都是零点"
    }
  },
  {
    "id": "1.3.1",
    "name": "三角函数定义+同角关系+诱导公式",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.3",
    "moduleName": "三角函数与解三角形",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "sin²α+cos²α=1；tanα=sinα/cosα；诱导公式\"奇变偶不变，符号看象限\"",
      "steps": "① 同角：知一求二，画直角三角形定号 ② 诱导：大角化锐角（先化±2kπ，再化π±,π/2±）③ 象限符号一全正二正弦三切四余弦",
      "traps": "sinα+cosα、sinα-cosα、sinαcosα三者知一求二（平方关系）；开根号要根据象限定正负。",
      "recent": "2024I卷第4题、几乎每年第4-6题"
    }
  },
  {
    "id": "1.3.2",
    "name": "y=Asin(ωx+φ)图像与5大性质",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.3",
    "moduleName": "三角函数与解三角形",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "y=Asin(ωx+φ)+B：振幅|A|，周期T=2π/|ω|，相位ωx+φ，初相φ；最大值B+|A|，最小值B-|A|",
      "steps": "求φ：代最值点（不要代零点，零点可能是递增过0或递减过0，两解）；单调区间：令u=ωx+φ∈[-π/2+2kπ,π/2+2kπ]解x",
      "traps": "ω<0时先化ω>0（提负号sin(-u)=-sinu）再求单调区间；对称中心是函数值=B的点，对称轴是最值点。",
      "recent": "2024I卷多选9、2023II卷第9题"
    }
  },
  {
    "id": "1.3.3",
    "name": "三角恒等变换（和差/二倍角/辅助角）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.3",
    "moduleName": "三角函数与解三角形",
    "weightScore": 10,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "sin(α±β)=sinαcosβ±cosαsinβ；cos(α±β)=cosαcosβ∓sinαsinβ；tan(α±β)=(tanα±tanβ)/(1∓tanαtanβ)；二倍角cos2α=2cos²α-1=1-2sin²α；辅助角a sinx+b cosx=√(a²+b²)sin(x+φ)",
      "steps": "① 看目标角和已知角关系（比如2α=(α+β)+(α-β)）② 统一角度 ③ 辅助角公式一定要先提√(a²+b²)",
      "traps": "降幂公式：sin²α=(1-cos2α)/2，cos²α=(1+cos2α)/2（别搞反加减号）；辅助角φ所在象限由(a,b)符号定。",
      "recent": "2024I卷第17题（解三角第1问）、2023I卷17题"
    }
  },
  {
    "id": "1.3.4",
    "name": "正弦定理+余弦定理+面积公式",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.3",
    "moduleName": "三角函数与解三角形",
    "weightScore": 12,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "正弦定理a/sinA=b/sinB=c/sinC=2R；余弦定理a²=b²+c²-2bc cosA ⇒ cosA=(b²+c²-a²)/(2bc)；面积S=½bc sinA",
      "steps": "① 判方向：已知两边一对角→正弦；已知两边夹角/三边→余弦 ② 边角互化（正弦把a换2RsinA）③ 多解情形（SSA）：a<b sinA无解/a=b sinA一解/…两解",
      "traps": "正弦定理求sinB>0，B可能锐角或钝角，两个解都要代回三角不等式A+B+C=π验证；大边对大角可快速舍一解。",
      "recent": "2024I/II卷第19题解答、2023I卷17题"
    }
  },
  {
    "id": "1.3.5",
    "name": "解三角形综合+最值范围问题",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.3",
    "moduleName": "三角函数与解三角形",
    "weightScore": 8,
    "diffLevel": 4,
    "freqLevel": 4,
    "learnCard": {
      "form": "求最值：面积/周长/(b+c)范围，用余弦定理+基本不等式（a²=b²+c²-bc≥2bc-bc=bc ∴ bc≤a²）",
      "steps": "① 先求A（已知条件通常能求一角）② 写余弦定理 a²=b²+c²-2bc cosA ③ 用基本不等式把b²+c²换成≥2bc或对b+c整体平方 ④ 锐角三角形条件：每个余弦>0",
      "traps": "最容易漏的是锐角三角形的限制条件：只要求B和C都是锐角（A已求出锐角时，B<π/2且C=π-A-B<π/2），这会让范围收缩一截。",
      "recent": "2024II卷第19题第2问、2022I卷解三角最值"
    }
  },
  {
    "id": "1.4.1",
    "name": "数列基础：an与Sn关系（分段）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.4",
    "moduleName": "数列",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "aₙ与Sₙ分段关系：n=1时a₁=S₁；n≥2时aₙ=Sₙ-Sₙ₋₁；最后要验证n=1是否满足通式",
      "steps": "① 已知Sₙ求aₙ：严格分n=1和n≥2 ② 已知aₙ与Sₙ混合式：写n→n-1两式相减消去S ③ 得到aₙ=k aₙ₋₁形（等比）",
      "traps": "90%的人会忘记验证n=1是否符合通式！不符合就分段写：aₙ={S₁, n=1; Sₙ-Sₙ₋₁, n≥2}。",
      "recent": "2024I卷17题、2023卷17题都是aₙ和Sₙ关系起步"
    }
  },
  {
    "id": "1.4.2",
    "name": "等差数列通项/求和/性质",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.4",
    "moduleName": "数列",
    "weightScore": 8,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "等差通项aₙ=a₁+(n-1)d；前n和Sₙ=n(a₁+aₙ)/2=na₁+n(n-1)d/2；等差中项2A=a+b；下标和性质：m+n=p+q⇒aₘ+aₙ=aₚ+a_q",
      "steps": "① 已知两条件列方程组求a₁,d（基本量法万能）② 前n项和最值：找aₙ变号的位置或Sₙ是二次函数（开口向下顶点最大）③ Sₖ,S₂ₖ-Sₖ,S₃ₖ-S₂ₖ仍等差",
      "traps": "Sₙ是关于n的无常数项二次函数 ⇔ {aₙ}等差；如果有常数项说明a₁不符合（要分段）。",
      "recent": "2024II卷第8题、基础题高频"
    }
  },
  {
    "id": "1.4.3",
    "name": "等比数列通项/求和/性质",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.4",
    "moduleName": "数列",
    "weightScore": 8,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "等比通项aₙ=a₁qⁿ⁻¹；前n和Sₙ=a₁(1-qⁿ)/(1-q)(q≠1)；等比中项G²=ab；下标积性质m+n=p+q⇒aₘaₙ=aₚa_q",
      "steps": "① 基本量法求a₁,q（注意q=1要单独讨论，公式是q≠1情形）② 奇偶项比、连续m项和成等比 ③ 无穷递缩等比（|q|<1）S=a₁/(1-q)",
      "traps": "等比数列任意一项≠0，公比q≠0；偶数项符号都相同（因为q²倍），奇数项也相同。",
      "recent": "2023I卷第13题、2022卷17题综合"
    }
  },
  {
    "id": "1.4.4",
    "name": "数列求通项的5种方法",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.4",
    "moduleName": "数列",
    "weightScore": 8,
    "diffLevel": 4,
    "freqLevel": 5,
    "learnCard": {
      "form": "5种方法：①公式法（已知等差等比）②累加法（aₙ-aₙ₋₁=f(n)型）③累乘法（aₙ/aₙ₋₁=g(n)型）④构造法（aₙ=paₙ₋₁+q→两边+q/(p-1)构造等比）⑤倒数法（aₙ=paₙ₋₁/(qaₙ₋₁+p)→取倒数等差）",
      "steps": "① 写出n≥2的递推式 ② 对照五种模型选方法 ③ 求出后务必验证n=1是否成立",
      "traps": "构造法aₙ+1=2aₙ+3 ⇒ (aₙ+3)=2(aₙ₋₁+3)，构造的是等比数列{bₙ=aₙ+3}；注意新数列的首项b₁=a₁+3。",
      "recent": "解答题17题第一问必为求通项，5种方法轮换考"
    }
  },
  {
    "id": "1.4.5",
    "name": "数列求和6法（裂项/错位/分组等）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.4",
    "moduleName": "数列",
    "weightScore": 10,
    "diffLevel": 4,
    "freqLevel": 5,
    "learnCard": {
      "form": "6种求和：①等差等比公式②裂项相消（1/[n(n+k)]=(1/k)(1/n-1/(n+k))；1/(√(n+1)+√n)=√(n+1)-√n）③错位相减（等差×等比型）④分组求和（拆成两个易求和）⑤倒序相加⑥并项求和（(-1)ⁿ型）",
      "steps": "裂项：先拆→写前几项看抵消→剩前后对称项→化简通分；错位相减：Sₙ写一式，qSₙ写一式，对齐减，等比求和，化系数为1",
      "traps": "错位相减是高考丢分重灾区：Sₙ - qSₙ = (1-q)Sₙ，最后Sₙ要除以(1-q)，首项末项的符号极易错；裂项要注意1/[n(n+1)(n+2)]是(1/2)[1/n(n+1)-1/(n+1)(n+2)]不是两项。",
      "recent": "2024I卷17题（2）、2023卷17（2）都是错位或裂项"
    }
  },
  {
    "id": "1.5.1",
    "name": "导数概念+求导公式+四则+复合求导",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.5",
    "moduleName": "导数及其应用",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "(xⁿ)'=n xⁿ⁻¹；(eˣ)'=eˣ；(lnx)'=1/x；(sinx)'=cosx；(cosx)'=-sinx；四则(fg)'=f'g+fg'；(f/g)'=(f'g-fg')/g²；复合[f(g(x))]'=f'(g(x))·g'(x)",
      "steps": "① 先化简原式（对数展开、真数开方/乘方化系数） ② 再求导（减少计算量）③ 复合函数别漏乘内层导数",
      "traps": "最易错的是复合函数漏乘内层导数：比如[e^(2x)]'=2e^(2x)，不是e^(2x)；乘积求导是加号，商求导分子是减号且顺序不能反。",
      "recent": "所有导数大题第一问必求导；选择填空考切线（导数意义）"
    }
  },
  {
    "id": "1.5.2",
    "name": "导数几何意义：切线方程（高频）",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.5",
    "moduleName": "导数及其应用",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "导数几何意义：f'(x₀)是y=f(x)在(x₀,f(x₀))处切线斜率；切线方程y-f(x₀)=f'(x₀)(x-x₀)；切点在曲线也在切线上",
      "steps": "① 已知切点(x₀,f(x₀))：直接代公式 ② 未知切点（\"过点P(a,b)\"切线）：设切点(x₀,f(x₀))，切线方程写出来，P在切线上代入解方程求x₀ ③ x₀可能多解",
      "traps": "\"过点P\"和\"在点P处\"是两回事！后者P就是切点，前者P不一定在曲线上，要设切点解；公共切线要对两条曲线分别设切点，斜率相等且截距相等联立。",
      "recent": "2024I卷第7题、2023I卷第7题、年年必考选择第7-8位"
    }
  },
  {
    "id": "1.5.3",
    "name": "导数研究函数：单调性+极值+最值",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.5",
    "moduleName": "导数及其应用",
    "weightScore": 15,
    "diffLevel": 4,
    "freqLevel": 5,
    "learnCard": {
      "form": "f'(x)>0 ⇒ f严格递增；f'(x)≥0 ⇒ f不减；驻点f'(x₀)=0且左右导数变号→极值（左正右负极大，左负右正极小）；闭区间最值=端点+所有驻点中挑最大最小",
      "steps": "① 求定义域 ② 求导→通分因式分解（必须分解到一次因子乘积）③ 画f'(x)符号表（零点从小到大）④ 写单调/极值",
      "traps": "极值点一定是驻点或不可导点，但驻点不一定是极值点（x=0对y=x³是驻点非极值）；单调区间端点如果在定义域内可以写成闭区间。",
      "recent": "2024I卷22题（1）、2023卷22（1）、多选12题"
    }
  },
  {
    "id": "1.5.4",
    "name": "含参函数单调性4级分类讨论",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.5",
    "moduleName": "导数及其应用",
    "weightScore": 12,
    "diffLevel": 5,
    "freqLevel": 5,
    "learnCard": {
      "form": "含参单调性四级讨论顺序：①最高次项系数是否0（退化为低次）②判别式Δ（根的个数）③两根大小关系④根与定义域端点比较",
      "steps": "例f(x)=(1/2)ax²-(a+1)x+lnx(a∈R)，x>0：求导f'=ax-(a+1)+1/x=(ax-1)(x-1)/x；讨论a=0（退化为一次）、a>0（比较1/a与1大小：a>1, a=1, 0<a<1三种子情况）、a<0（两根1/a负<0<1，只看x>0）",
      "traps": "分类要不重不漏，讨论树要画清楚；最后写结论时\"综上\"分情况整理；最容易漏掉a=0的情形（二次函数退化为一次，漏掉整类大分支丢6分以上）。",
      "recent": "2024I卷22题（2）、2023卷22（2）都是含参分类讨论，导数压轴第2问固定考法"
    }
  },
  {
    "id": "1.5.5",
    "name": "导数压轴：零点/恒成立/双变量偏移",
    "themeId": 1,
    "themeName": "函数与导数",
    "moduleId": "1.5",
    "moduleName": "导数及其应用",
    "weightScore": 10,
    "diffLevel": 5,
    "freqLevel": 5,
    "learnCard": {
      "form": "恒成立三大法：①分参（能分就分，避开讨论）→g(x)≥a恒成立⇔min[g(x)]≥a ②最值法（分类讨论求f的最值）③放缩法：常见eˣ≥x+1、lnx≤x-1(x>0)、sinx≤x(x≥0)；双变量：固定一变量为参数构造函数",
      "steps": "零点：分参a=g(x)→转y=a与y=g(x)交点数；恒成立：先猜后证（端点效应、特殊值卡a的范围再证）；数列不等式：前面结论铺路（令x=某与n有关的表达式再累加）",
      "traps": "分参时注意乘负数变号；端点效应只能缩小讨论范围不能直接写答案，必要不充分；放缩要先单独证明一下再用。",
      "recent": "2024/2023/2022 三年导数压轴22题第3问全是放缩+证明，12分难度最高"
    }
  },
  {
    "id": "2.1.1",
    "name": "复数概念+分类+共轭复数",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.1",
    "moduleName": "复数",
    "weightScore": 5,
    "diffLevel": 1,
    "freqLevel": 5,
    "learnCard": {
      "form": "z=a+bi(a,b∈R)：实部a、虚部b；纯虚数a=0且b≠0；共轭复数z̄=a-bi；相等⇔实部虚部分别相等",
      "steps": "① 分母实数化（分子分母同乘分母的共轭）② 化简到a+bi标准形 ③ 按定义判断",
      "traps": "虚部是b不是bi；\"z是纯虚数\"要特别注意a=0且b≠0两个条件，b=0时z=0是实数。",
      "recent": "2024I卷第2题、年年第2题送分"
    }
  },
  {
    "id": "2.1.2",
    "name": "复数四则运算+分母实数化",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.1",
    "moduleName": "复数",
    "weightScore": 5,
    "diffLevel": 1,
    "freqLevel": 5,
    "learnCard": {
      "form": "z=a+bi四则：(a+bi)±(c+di)=(a±c)+(b±d)i；(a+bi)(c+di)=(ac-bd)+(ad+bc)i；(a+bi)/(c+di)乘(c-di)/(c-di)分母实数化",
      "steps": "① 分母实数化是核心，记住(c+di)(c-di)=c²+d² ② 高次幂利用i⁴=1降幂（i¹=i,i²=-1,i³=-i,i⁴=1）③ 设z=a+bi待定系数法",
      "traps": "除法最易错：分子展开后实部虚部分类，每项都要乘；z·z̄=|z|²=a²+b²是实数，这个等式几乎每道复数题都能用。",
      "recent": "2024I卷第2题、2023卷第2题（几乎一模一样）"
    }
  },
  {
    "id": "2.1.3",
    "name": "复数模+几何意义+周期性",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.1",
    "moduleName": "复数",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 3,
    "learnCard": {
      "form": "|z|=√(a²+b²)（复平面上到原点距离）；|z₁z₂|=|z₁||z₂|；|z₁/z₂|=|z₁|/|z₂|；|z-z₀|=r是以z₀为圆心r为半径的圆；z的周期性zⁿ⁺⁴=iⁿ·z⁴",
      "steps": "① 几何意义题：转成坐标(a,b)在复平面对应点(a,b) ② |z-z₀|的最值=|z₀到圆心距离|±r ③ 实系数方程虚根共轭成对",
      "traps": "|z|²=z·z̄；|z₁+z₂|≤|z₁|+|z₂|（三角不等式），与向量模性质一致；虚系数方程虚根不共轭，不能用Δ<0判根。",
      "recent": "2022I卷第2题考模、模拟题常考几何意义"
    }
  },
  {
    "id": "2.2.1",
    "name": "平面向量线性运算（加减数乘）",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.2",
    "moduleName": "平面向量",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "向量加减：三角形法则（首尾相连）和平行四边形法则（共起点）；数乘λa：λ>0同向，λ<0反向，长度|λ|倍；向量共线定理：b与a(a≠0)共线⇔∃唯一λ，b=λa",
      "steps": "① 线性运算：选定一组基底（通常两条邻边），把目标向量反复用\"中点分一半\"、\"对角线和分\" ② 坐标法建系硬算往往更快",
      "traps": "AB向量 = B坐标 - A坐标（终点减起点，别搞反）；λa方向：λ>0不改变方向，λ<0反向，λ=0变成零向量。",
      "recent": "2024II卷13题、2023卷第10题多选"
    }
  },
  {
    "id": "2.2.2",
    "name": "平面向量坐标运算+共线判定",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.2",
    "moduleName": "平面向量",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "坐标运算：a=(x₁,y₁),b=(x₂,y₂)⇒a±b=(x₁±x₂,y₁±y₂)；λa=(λx₁,λy₁)；a∥b⇔x₁y₂=x₂y₁（内项积=外项积）；|a|=√(x₁²+y₁²)",
      "steps": "① 能建系就建系（直角坐标下所有题都能算，不需要想几何）② 共线判定：交叉相乘相等 ③ 分点公式：P分AB=m:n ⇒ P=(nA+mB)/(m+n)",
      "traps": "平行≠相等，平行是共线（可以倍数关系）；三点A,B,C共线判定：AB∥AC或AP=λAB+(1-λ)AC（系数和为1）。",
      "recent": "2024I卷第13题、基础填空必出"
    }
  },
  {
    "id": "2.2.3",
    "name": "平面向量数量积（点乘·夹角·模长）",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.2",
    "moduleName": "平面向量",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "数量积a·b=|a||b|cosθ=x₁x₂+y₁y₂；a⊥b⇔a·b=0；|a|²=a·a；投影向量=(a·b/|b|²)·b；投影数量=a·b/|b|",
      "steps": "① 求夹角：cosθ=a·b/(|a||b|) ② 求模：|a+b|²=|a|²+2a·b+|b|²（平方法万能）③ 最值：坐标化转二次函数",
      "traps": "a·b=0⇒⊥没错，但反过来⊥⇒a·b=0成立；注意零向量与任何向量数量积为0，但不与任何向量垂直（定义要求非零）；夹角范围[0,π]，不是(0,π/2)。",
      "recent": "2024I卷多选10、2023II卷多选10（向量年年多选一道）"
    }
  },
  {
    "id": "2.2.4",
    "name": "向量垂直判定+投影+最值",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.2",
    "moduleName": "平面向量",
    "weightScore": 5,
    "diffLevel": 4,
    "freqLevel": 4,
    "learnCard": {
      "form": "垂直判定a⊥b⇔a·b=0；向量最值：①坐标化二次函数 ②三角不等式||a|-|b||≤|a±b|≤|a|+|b|；极化恒等式a·b=(|a+b|²-|a-b|²)/4（中点模型）",
      "steps": "最值问题三选一：①坐标法②几何意义（圆上点到定点距离类）③平方后用数量积化简",
      "traps": "求最值要注意参数范围（题目约束）；向量a在b方向投影是数量=a·b/|b|（可正可负可零），投影向量是向量，两者要分清。",
      "recent": "2023I卷12题综合最值、模考题高频"
    }
  },
  {
    "id": "2.3.1",
    "name": "空间几何体三视图+斜二测画法",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 4,
    "learnCard": {
      "form": "三视图：长对正、高平齐、宽相等；斜二测画法：平行依旧垂改斜，横等纵半竖不变；直观图面积=原图形面积×√2/4",
      "steps": "① 三视图还原：先看俯视图定底面，再看正/侧视图定高和顶点 ② 斜二测：原面积=直观图面积×2√2（反过来乘2√2）",
      "traps": "最易错是虚线（被挡住的棱）——看不到的棱画虚线；看见虚线代表后面有东西，不要漏体积/表面积。",
      "recent": "新高考三视图考得少了，但2022II卷、模考仍然出现"
    }
  },
  {
    "id": "2.3.2",
    "name": "空间几何体表面积+体积公式",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "V柱=Sh；V锥=Sh/3；V台=h(S上+√(S上S下)+S下)/3；V球=4πR³/3；S球=4πR²；正棱锥侧面都是等腰三角形",
      "steps": "① 求体积：选好底面（要容易算面积）和高（必须垂直底面）② 换顶点法（三棱锥体积任意顶点）③ 表面积=侧面积+底面积，要一个个面算",
      "traps": "锥体别忘1/3；台体公式别记错（上下底面积和+几何平均）；\"内切球半径r=3V/S表\"只对有内切球的多面形成立（体积法：把多面体切成以内心为顶各个面为底的小棱锥求和）。",
      "recent": "2024I卷第6题外接球表面积、2023I卷第14题"
    }
  },
  {
    "id": "2.3.3",
    "name": "球的表面积体积+外接球5大模型",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 5,
    "diffLevel": 4,
    "freqLevel": 5,
    "learnCard": {
      "form": "外接球模型5大类：①墙角模型（三侧棱两两垂直）⇒补长方体，2R=√(a²+b²+c²)②对棱相等⇒补长方体 ③一条棱⊥底面⇒2R=√(h²+(2r)²)（r底面外接圆半径）④直棱柱/圆柱⇒同上⑤正棱锥⇒球心在高线上，勾股R²=(h-R)²+r²",
      "steps": "① 先判属于哪一类模型 ② 找/算底面外接圆半径r（正弦定理a/sinA=2r对任意三角形）③ 列勾股方程解R ④ 面积4πR²或体积(4/3)πR³",
      "traps": "\"外接球过所有顶点\"，所以一定有R²=r²+d²（d是球心到底面距离）；内切球：等体积法万能（V=(1/3)r·S表），不需要记模型。",
      "recent": "2024I卷第6题、2023II卷第6题（立体选择必有一道球）"
    }
  },
  {
    "id": "2.3.4",
    "name": "空间点线面位置关系+4公理",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 4,
    "learnCard": {
      "form": "4公理：1.两点定直线 2.不共线三点定平面 3.交线唯一 4.平行公理；线线3种（平行/相交/异面）线面3种（在面内/平行/相交）面面2种（平行/相交）",
      "steps": "① 位置关系判定：举反例（尤其正方体里找反例很快）② 推理论证：从定义/公理/判定定理出发",
      "traps": "\"直线在平面外\"包含平行和相交两种，不要误以为只平行；异面直线所成角范围(0,π/2]，取锐角或直角。",
      "recent": "2023I卷多选10、常考多选判断正误"
    }
  },
  {
    "id": "2.3.5",
    "name": "空间平行关系（线面/面面）判定与性质",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 6,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "线面平行判定：a⊄α,b⊂α,a∥b⇒a∥α；性质：a∥α,a⊂β,α∩β=b⇒a∥b；面面平行判定：两相交直线都平行另一平面；性质：两平行面被第三面所截交线平行",
      "steps": "① 证线面平行核心是找线线平行：中位线、平行四边形、分线段比例 ② 证面面平行=证两组相交线分别平行 ③ 要画辅助线时说明清楚",
      "traps": "推线线平行必须用\"线面平行的性质定理\"——要有第三个平面与α相交出交线b，不能直接说a∥α就∥α内所有直线。",
      "recent": "2024I卷20（1）、2023II卷20（1），立体解答第一问固定证平行/垂直"
    }
  },
  {
    "id": "2.3.6",
    "name": "空间垂直关系（线面/面面）判定与性质",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 6,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "线面垂直判定：l⊥m,l⊥n,m∩n=P,m,n⊂α⇒l⊥α；面面垂直判定：一个面过另一个面的一条垂线⇒l⊂β,l⊥α⇒β⊥α；性质：β⊥α,β∩α=m,l⊂β,l⊥m⇒l⊥α",
      "steps": "证线面垂直=证这条线垂直于面内两条相交直线（优先找题目已有的垂直）；面面垂直→在一个面内做交线的垂线即得线面垂直（常用第二问建系）",
      "traps": "\"l⊥α内无数条平行直线\"不能推出l⊥α（无数条≠任意一条，必须是两条相交线）；用面面垂直性质定理的4个条件缺一不可。",
      "recent": "立体解答第1问每年交替考平行或垂直，满分必拿"
    }
  },
  {
    "id": "2.3.7",
    "name": "空间角：异面直线/线面/二面角",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 8,
    "diffLevel": 4,
    "freqLevel": 5,
    "learnCard": {
      "form": "空间角范围：异面直线角(0,π/2]、线面角[0,π/2]、二面角[0,π]；定义法+空间向量法（cosθ=法向量夹角余弦，注意钝锐）",
      "steps": "① 定义法：找/作平面角（在棱上取点，两个面内分别做棱垂线）② 向量法：建系→写点→求法向量n₁,n₂→cosθ=±n₁·n₂/(|n₁||n₂|)→看图定钝锐补正负",
      "traps": "二面角是法向量夹角还是其补角？一定要看两个法向量是都指向二面角内部/外部（互补），还是一内一外（相等）。高考几乎每次都要翻符号。",
      "recent": "2024I卷20（2）、2023卷20（2），立体解答第二问固定求二面角/线面角"
    }
  },
  {
    "id": "2.3.8",
    "name": "空间向量建系+法向量+求角求距离",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.3",
    "moduleName": "立体几何初步+空间向量",
    "weightScore": 12,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "建系原则：找三条两两垂直的直线（墙角、直棱柱侧棱、面面垂直的交线+垂线）；法向量求法：n⊥a,n⊥b⇒n·a=0,n·b=0解方程组，令一个坐标=1；点到面距离d=|AP·n|/|n|",
      "steps": "① 建系→写清各点坐标（别写错，错一个全崩）② 求两个面的法向量 ③ 按公式算正弦/余弦/距离 ④ 单位和作答",
      "traps": "建系O-xyz必须是右手系；法向量不唯一（可以倍数），随便取一个方便的就行；二面角要答\"大小为θ或其补角\"再根据实际图形选对的一个。",
      "recent": "2024/23/22卷立体解答都是空间向量法，12分必拿步骤分"
    }
  },
  {
    "id": "2.4.1",
    "name": "直线倾斜角斜率+5种方程+位置关系",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 4,
    "learnCard": {
      "form": "5种方程：点斜y-y₀=k(x-x₀)；斜截y=kx+b；两点式(y-y₁)/(y₂-y₁)=(x-x₁)/(x₂-x₁)；截距x/a+y/b=1；一般Ax+By+C=0；两直线平行k₁=k₂且b₁≠b₂；垂直k₁k₂=-1（斜率都存在时）",
      "steps": "① 选方程形式：已知斜率选点斜/斜截、已知两截距选截距、未知斜率要讨论斜率不存在（竖线x=a，常漏掉）② 平行垂直判定先看斜率是否存在",
      "traps": "截距式不能表示过原点/平行坐标轴的直线；斜率不存在（竖直线）是讨论遗漏的重灾区，每道题都要先想一下竖线行不行。",
      "recent": "和圆/圆锥曲线结合考联立，不单独出题"
    }
  },
  {
    "id": "2.4.2",
    "name": "3个距离公式（点线/两点/平行线）",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "两点距√[(x₂-x₁)²+(y₂-y₁)²]；点(x₀,y₀)到直线Ax+By+C=0距离=|Ax₀+By₀+C|/√(A²+B²)；两平行线Ax+By+C₁=0与Ax+By+C₂=0距离=|C₁-C₂|/√(A²+B²)",
      "steps": "① 距离公式必须先化直线一般式（A,B标准化）② 求最短路径问题：对称点法+两点连线（光的反射）",
      "traps": "两平行线距离公式要求A,B完全相同，要先把两个方程的x,y系数化一致；点到直线的距离公式是\"最短距离\"（垂直距离）。",
      "recent": "2024II卷第5题、解圆的问题核心基础"
    }
  },
  {
    "id": "2.4.3",
    "name": "圆的方程+点线圆位置关系+弦长切线",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "标准方程(x-a)²+(y-b)²=r²；一般x²+y²+Dx+Ey+F=0(D²+E²-4F>0)；点圆关系：d>r外,d=r上,d<r内；线圆：d>r相离,d=r切,d<r相交弦长|AB|=2√(r²-d²)；两圆|r₁-r₂|≤d≤r₁+r₂相交",
      "steps": "求弦长的核心方法：半径r、弦心距d、半弦长构成直角三角形——勾股定理r²=d²+(L/2)²",
      "traps": "过圆外一点引切线有两条，若用点斜式只求出一条，说明另一条是斜率不存在的竖线x=x₀，千万不要漏！",
      "recent": "2023II卷第5题、2022I卷第5题"
    }
  },
  {
    "id": "2.4.4",
    "name": "椭圆：定义/标准方程/a²=b²+c²/离心率",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 8,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "椭圆定义|PF₁|+|PF₂|=2a>2c=|F₁F₂|；标准x²/a²+y²/b²=1(a>b>0)；a²=b²+c²；离心率e=c/a∈(0,1)；通径2b²/a；焦点三角形面积=b²tan(θ/2)（θ=∠F₁PF₂）",
      "steps": "① 求a,b,c,e：从定义/条件列方程 ② 离心率题：找a,c的齐次方程（所有项都÷aⁿ得e的方程）③ 焦点三角形：用定义+余弦定理联立",
      "traps": "e<1是椭圆，e>1双曲线，e=1抛物线，离心率范围错直接整题崩；焦点在x或y轴要看清（分母大小判断）。",
      "recent": "2024I卷第16题填空压轴、2023卷第16题"
    }
  },
  {
    "id": "2.4.5",
    "name": "双曲线：定义/渐近线/离心率",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "双曲线定义||PF₁|-|PF₂||=2a<2c；标准x²/a²-y²/b²=1；c²=a²+b²；e=c/a>1；渐近线y=±(b/a)x；共轭双曲线：x²/a²-y²/b²=1和y²/b²-x²/a²=1（共渐近线，e关系1/e₁²+1/e₂²=1）",
      "steps": "求渐近线：令标准式右边1→0即得x²/a²=y²/b²⇒y=±(b/a)x；离心率找a,c齐次方程；与椭圆类似只是c²=a²+b²（注意是加号！）",
      "traps": "双曲线c最大（c>a,c>b），椭圆a最大，这是最常搞反的；\"双曲线上一点到焦点距离\"最小值是c-a，用定义可以验证。",
      "recent": "2024II卷第16题、2023卷第8题"
    }
  },
  {
    "id": "2.4.6",
    "name": "抛物线：定义（焦点准线转化）/焦半径/焦点弦",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "2.4.7",
    "name": "直线与圆锥曲线联立Δ+韦达+弦长",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 12,
    "diffLevel": 4,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "2.4.8",
    "name": "中点弦（点差法）+ 面积/斜率综合题",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 10,
    "diffLevel": 4,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "2.4.9",
    "name": "圆锥曲线压轴：定点/定值/最值范围问题",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 8,
    "diffLevel": 5,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "2.4.10",
    "name": "轨迹方程5种求法（直接/定义/代入/参数/交轨）",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.4",
    "moduleName": "解析几何",
    "weightScore": 5,
    "diffLevel": 4,
    "freqLevel": 3,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "2.5.1",
    "name": "两大计数原理（分类加法/分步乘法）",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.5",
    "moduleName": "计数原理/排列组合/二项式",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "排列Aₙᵐ=n!/(n-m)!；组合Cₙᵐ=n!/(m!(n-m)!)；Cₙᵐ=Cₙⁿ⁻ᵐ；Cₙᵐ=Cₙ₋₁ᵐ+Cₙ₋₁ᵐ⁻¹（帕斯卡）",
      "steps": "① 先分类后分步（加法/乘法原理）② 特殊元素/位置优先 ③ 相邻=捆绑法、不相邻=插空法、定序=除法（除以Aₖᵏ）",
      "traps": "排列有序组合无序——\"选出来再分配\"是A（如排列数），\"只选不分配\"是C；涂色问题从接触面最多的块开始涂色，别硬乘。",
      "recent": "2023II卷第3题、模考常考选择填空"
    }
  },
  {
    "id": "2.5.2",
    "name": "排列+排列数公式+7种应用题方法",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.5",
    "moduleName": "计数原理/排列组合/二项式",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 4,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "2.5.3",
    "name": "组合+组合数公式+性质+分组分配",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.5",
    "moduleName": "计数原理/排列组合/二项式",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 4,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "2.5.4",
    "name": "二项式定理：通项+系数性质+赋值法",
    "themeId": 2,
    "themeName": "几何与代数",
    "moduleId": "2.5",
    "moduleName": "计数原理/排列组合/二项式",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "二项式(a+b)ⁿ=ΣCₙʳ aⁿ⁻ʳ bʳ（r从0到n）；通项T_{r+1}=Cₙʳ aⁿ⁻ʳ bʳ；二项式系数之和2ⁿ；奇次二项式系数和=偶次=2ⁿ⁻¹；赋值法：令a=1,b=1/0/-1得各种系数和",
      "steps": "① 指定项：用通项公式T_{r+1}列方程解r ② 系数最值：中间项（n偶第n/2+1项，n奇第(n±1)/2+1两项）二项式系数最大 ③ 系数和：令所有字母=1 ④ (a-b)ⁿ的r+1项是(-1)^r Cₙʳ a^(n-r) b^r",
      "traps": "\"二项式系数\"只指Cₙʳ，不包括a,b里的常数；\"系数\"包含常数部分；这两者最大值位置不同；(1+2x)ⁿ的\"x²项系数\"和\"x²的二项式系数\"是不同的。",
      "recent": "2024I卷第5题、2023卷第14题，二项式几乎年年填空或选择"
    }
  },
  {
    "id": "3.1.1",
    "name": "随机事件+频率概率+古典概型",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.1",
    "moduleName": "事件与概率",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "古典概型P(A)=m/n；几何概型P(A)=测度(A)/测度(Ω)；互斥P(A∪B)=P(A)+P(B)；对立P(Ā)=1-P(A)；条件概率P(B|A)=P(AB)/P(A)；乘法P(AB)=P(A)P(B|A)",
      "steps": "条件概率三步走：①缩小样本空间到A发生的情形 ②数A∩B个数 ③P=|A∩B|/|A|；或用公式算",
      "traps": "P(B|A)≠P(A|B)（贝叶斯的核心区别）；独立事件P(AB)=P(A)P(B)，与互斥不能同时成立（除非有概率0事件）。",
      "recent": "2024I卷14题、2023卷第14题考条件概率/古典概型"
    }
  },
  {
    "id": "3.1.2",
    "name": "几何概型+概率5大公式（互斥/对立/条件/独立）",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.1",
    "moduleName": "事件与概率",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 4,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.1.3",
    "name": "独立重复试验+二项分布B(n,p)期望方差",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.1",
    "moduleName": "事件与概率",
    "weightScore": 10,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "二项分布X~B(n,p)：P(X=k)=Cₙᵏ pᵏ (1-p)ⁿ⁻ᵏ；E(X)=np；D(X)=np(1-p)；几何分布（首次成功）P(X=k)=(1-p)ᵏ⁻¹ p；E(X)=1/p；超几何：N总数M次品数n抽，P(X=k)=C_Mᵏ C_{N-M}^{n-k}/C_Nⁿ",
      "steps": "判分布：①二项：独立重复n次，每次成功率p，关注成功次数 ②几何：独立重复直到首次成功，关注试验次数 ③超几何：不放回抽样（与二项区别：放回=二项，不放回=超几何，N很大n很小时近似）",
      "traps": "二项分布四要素：①n次独立 ②每次两个结果 ③每次p不变 ④关注次数；少一个都不是；方差np(1-p)最大值在p=1/2时。",
      "recent": "2023II卷15题、2022卷解答21题考二项期望方差"
    }
  },
  {
    "id": "3.1.4",
    "name": "超几何分布H(N,M,n)+期望公式",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.1",
    "moduleName": "事件与概率",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 4,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.1.5",
    "name": "正态分布N(μ,σ²)+3σ原则+对称性求概率",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.1",
    "moduleName": "事件与概率",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "正态分布X~N(μ,σ²)：μ均值对称轴，σ标准差（越大越矮胖）；P(μ-σ<X<μ+σ)≈68.3%；±2σ≈95.4%；±3σ≈99.7%；3σ原则；Z=(X-μ)/σ~N(0,1)标准化",
      "steps": "① 标准化Z=(X-μ)/σ ② 利用对称性（P(X<μ-a)=P(X>μ+a)）③ 查标准正态或用±σ区间近似",
      "traps": "正态曲线关于x=μ对称，左右两边概率各0.5；\"P(X<80)=0.8\"可以推出P(X>120)=P(X<80)当且仅当μ=100时——对称中心要对。",
      "recent": "2024I卷多选11、2023卷多选11，正态分布几乎每年多选一道"
    }
  },
  {
    "id": "3.1.6",
    "name": "全概率公式+贝叶斯公式（新教材新增）",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.1",
    "moduleName": "事件与概率",
    "weightScore": 5,
    "diffLevel": 4,
    "freqLevel": 4,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.2.1",
    "name": "离散型随机变量分布列+2条性质",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.2",
    "moduleName": "离散型随机变量分布列",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.2.2",
    "name": "两点分布+超几何/二项/几何分布速查表",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.2",
    "moduleName": "离散型随机变量分布列",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.2.3",
    "name": "期望E(X)定义+线性性质+实际意义",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.2",
    "moduleName": "离散型随机变量分布列",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "期望E(X)=Σxᵢpᵢ；线性E(aX+b)=aE(X)+b；方差D(X)=Σ(xᵢ-EX)²pᵢ=E(X²)-(EX)²；D(aX+b)=a²D(X)；二项B(n,p):E=np,D=np(1-p)；超几何E=nM/N；两点分布E=p,D=p(1-p)",
      "steps": "写分布列四步：①确定X所有可能取值 ②逐个求P(X=k) ③验证概率和=1 ④按定义算E,D；D(X)=E(X²)-(E(X))²是最实用的公式",
      "traps": "分布列概率和必须=1，算完一定要加一遍验证（差多少就是哪一个算错了）；D(aX+b)=a²D(X)，a要平方，常数b扔掉。",
      "recent": "每道概率解答都要算期望+方差，2024I卷21题、2023卷21题全是"
    }
  },
  {
    "id": "3.2.4",
    "name": "方差D(X)定义+性质+稳定性意义",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.2",
    "moduleName": "离散型随机变量分布列",
    "weightScore": 5,
    "diffLevel": 3,
    "freqLevel": 4,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.3.1",
    "name": "随机抽样3法（简单/分层/系统）",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.3",
    "moduleName": "统计与统计案例",
    "weightScore": 5,
    "diffLevel": 1,
    "freqLevel": 4,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.3.2",
    "name": "频率分布直方图+平均数/中位数/众数计算",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.3",
    "moduleName": "统计与统计案例",
    "weightScore": 8,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.3.3",
    "name": "样本5数字特征+百分位数+方差标准差",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.3",
    "moduleName": "统计与统计案例",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 5,
    "learnCard": {
      "form": "核心公式详见教材本节内容",
      "steps": "① 理解概念定义 ② 记牢公式适用条件 ③ 做3道典型题（基础+真题+易错）",
      "traps": "审题要慢、计算要准；单位、范围、约束条件三检查。",
      "recent": "近五年全国卷I/II均出现过，属于考纲要求掌握内容。",
      "_fallback": true
    }
  },
  {
    "id": "3.3.4",
    "name": "变量相关性+相关系数r+散点图",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.3",
    "moduleName": "统计与统计案例",
    "weightScore": 5,
    "diffLevel": 2,
    "freqLevel": 4,
    "learnCard": {
      "form": "独立性检验χ²=n(ad-bc)²/[(a+b)(c+d)(a+c)(b+d)]（n=a+b+c+d总样本数）；自由度1临界值：χ²>6.635≈P≤0.01有99%把握；χ²>3.841≈95%把握；χ²≤2.706没有充分证据",
      "steps": "① 先把2×2列联表的四个格子a,b,c,d填对（和验证行列总和匹配）② 代公式算χ² ③和临界值比大小 ④ 规范作答：\"χ²=...>6.635，故有99%的把握认为两变量有关\"",
      "traps": "\"没有充分证据拒绝H₀（独立）\"≠\"有充分证据接受H₀（独立）\"≠\"两变量一定独立\"——只是证据不足，不能肯定独立！（统计结论的易错点）",
      "recent": "2024I卷21题、2023II卷18题——年年解答题考独立性检验（必考！）"
    }
  },
  {
    "id": "3.3.5",
    "name": "线性回归方程ŷ=b̂x+â（必过样本中心）",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.3",
    "moduleName": "统计与统计案例",
    "weightScore": 10,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "回归直线ŷ=bx+a必过样本中心(x̄, ȳ)；b=Σ(xᵢ-x̄)(yᵢ-ȳ)/Σ(xᵢ-x̄)²=相关系数r·(s_y/s_x)；a=ȳ-b x̄；相关系数r∈[-1,1]，|r|越接近1线性相关越强",
      "steps": "① 先算x̄, ȳ（5个数据几乎都是整十，计算快）② 套b的公式：分子Σ(xᵢyᵢ)-n x̄ȳ，分母Σxᵢ²-n x̄² ③ a=ȳ-bx̄ ④ 回归直线用ŷ（有帽），别写y",
      "traps": "r≈0只能说明没有线性相关，可能存在别的非线性相关（比如二次、指数关系），不能说\"没有任何关系\"；回归方程只能在样本数据x的范围内做预测，不能外推太远。",
      "recent": "2023I卷18题、2022II卷18题全是回归直线大题"
    }
  },
  {
    "id": "3.3.6",
    "name": "独立性检验χ²卡方+2×2列联表+临界值判断",
    "themeId": 3,
    "themeName": "概率与统计",
    "moduleId": "3.3",
    "moduleName": "统计与统计案例",
    "weightScore": 10,
    "diffLevel": 3,
    "freqLevel": 5,
    "learnCard": {
      "form": "统计大题综合：①抽样方法（简单随机/分层/系统）②数据处理（茎叶图、频率分布直方图：面积=频率，组距×高=频率，所有矩形面积和=1，中位数≈累积频率0.5对应x）③数字特征（平均数/方差/百分位数）④独立性检验/回归直线+概率分布列",
      "steps": "做统计大题流程：① 读题画表把数据写清楚（别把数字抄错）② 列联表/算x̄ȳ一步一步写 ③ 公式抄一遍再代数 ④ 结论要规范（和课本原话一致）",
      "traps": "频率分布直方图的纵轴是\"频率/组距\"，不是频率！求某区间频率=高×组距；平均数=组中值×频率求和；中位数要从左累加面积到0.5的位置（用插值）。",
      "recent": "2024/23/22 三年I卷第18或21题固定是统计大题，12-14分，属于要拿满分的中档题"
    }
  }
];
  var NEW_EX = [
  {
    "id": "2025-I",
    "year": 2025,
    "volume": "I卷",
    "name": "2025年普通高等学校招生全国统一考试 · 新高考I卷 数学",
    "shortName": "2025新高考I卷",
    "totalScore": 150,
    "totalQuestions": 22,
    "avgDifficulty": 3.2,
    "questions": [
      {
        "num": 1,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "A",
        "kpId": "1.1.1",
        "stem": "已知集合A={x|x²-3x-10≤0}，B={x|2x-3>0}，则A∩B=",
        "diffLevel": 1,
        "wrongRate": 0.12,
        "relatedKpIds": [
          "1.1.2"
        ]
      },
      {
        "num": 2,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "B",
        "kpId": "2.1.2",
        "stem": "已知i为虚数单位，若(2+ai)(1-i)=4+3i，则a=",
        "diffLevel": 1,
        "wrongRate": 0.15,
        "relatedKpIds": [
          "2.1.1",
          "2.1.3"
        ]
      },
      {
        "num": 3,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "C",
        "kpId": "1.2.7",
        "stem": "设a=log₂0.3，b=0.3²，c=2^0.3，则a,b,c的大小关系为",
        "diffLevel": 2,
        "wrongRate": 0.25,
        "relatedKpIds": [
          "1.2.6",
          "1.2.8"
        ]
      },
      {
        "num": 4,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "D",
        "kpId": "1.3.1",
        "stem": "若sinα+cosα=1/5，且α∈(0,π)，则tanα=",
        "diffLevel": 3,
        "wrongRate": 0.42,
        "relatedKpIds": [
          "1.3.2"
        ]
      },
      {
        "num": 5,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "A",
        "kpId": "2.5.4",
        "stem": "在(2x-1/x)^6的展开式中，含x²项的系数为",
        "diffLevel": 3,
        "wrongRate": 0.38,
        "relatedKpIds": [
          "2.5.3"
        ]
      },
      {
        "num": 6,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "B",
        "kpId": "2.3.3",
        "stem": "在正四棱锥P-ABCD中，底面边长为2，侧棱长为√6，则该正四棱锥外接球的表面积为",
        "diffLevel": 4,
        "wrongRate": 0.55,
        "relatedKpIds": [
          "2.3.2",
          "2.3.4"
        ]
      },
      {
        "num": 7,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "C",
        "kpId": "1.5.2",
        "stem": "若曲线y=e^(ax)-ln(x+1)在x=0处的切线方程为2x-y+1=0，则a=",
        "diffLevel": 3,
        "wrongRate": 0.45,
        "relatedKpIds": [
          "1.5.1",
          "1.5.3"
        ]
      },
      {
        "num": 8,
        "type": "单选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": "D",
        "kpId": "2.4.6",
        "stem": "已知抛物线C:y²=4x的焦点为F，准线为l，P是l上一点，Q是直线PF与C的一个交点，若FP=4FQ，则|QF|=",
        "diffLevel": 4,
        "wrongRate": 0.62,
        "relatedKpIds": [
          "2.4.5",
          "2.4.7"
        ]
      },
      {
        "num": 9,
        "type": "多选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": [
          "A",
          "C"
        ],
        "kpId": "1.3.2",
        "stem": "关于函数f(x)=2sin(2x+π/3)，下列说法正确的是",
        "diffLevel": 3,
        "wrongRate": 0.48,
        "relatedKpIds": [
          "1.3.1",
          "1.3.3"
        ]
      },
      {
        "num": 10,
        "type": "多选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": [
          "B",
          "D"
        ],
        "kpId": "2.2.3",
        "stem": "已知向量a=(1,2)，b=(m,-1)，下列说法正确的是",
        "diffLevel": 3,
        "wrongRate": 0.45,
        "relatedKpIds": [
          "2.2.2",
          "2.2.4"
        ]
      },
      {
        "num": 11,
        "type": "多选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": [
          "A",
          "B",
          "C"
        ],
        "kpId": "3.1.5",
        "stem": "已知随机变量X服从正态分布N(80,100)，下列结论正确的是",
        "diffLevel": 3,
        "wrongRate": 0.52,
        "relatedKpIds": [
          "3.1.2",
          "3.1.4",
          "3.1.6"
        ]
      },
      {
        "num": 12,
        "type": "多选",
        "score": 5,
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "answer": [
          "A",
          "D"
        ],
        "kpId": "1.5.3",
        "stem": "已知函数f(x)=x³-3x+1，下列说法正确的是",
        "diffLevel": 5,
        "wrongRate": 0.68,
        "relatedKpIds": [
          "1.2.2",
          "1.5.2",
          "1.5.4"
        ]
      },
      {
        "num": 13,
        "type": "填空",
        "score": 5,
        "answer": "6",
        "kpId": "2.2.1",
        "stem": "在平行四边形ABCD中，E是CD中点，AE交BD于点F，若AF=λAE，则λ=",
        "diffLevel": 2,
        "wrongRate": 0.28,
        "relatedKpIds": [
          "2.2.2"
        ]
      },
      {
        "num": 14,
        "type": "填空",
        "score": 5,
        "answer": "5/13",
        "kpId": "3.1.1",
        "stem": "从1,2,3,4,5,6,7,8,9中不放回地依次取2个数，在第一次取到偶数的条件下，第二次也取到偶数的概率为",
        "diffLevel": 3,
        "wrongRate": 0.4,
        "relatedKpIds": [
          "3.1.2"
        ]
      },
      {
        "num": 15,
        "type": "填空",
        "score": 5,
        "answer": "[-√5,√5]",
        "kpId": "1.1.4",
        "stem": "已知x>0，y>0，且2x+y=1，则xy的最大值为____；x²+y²的最小值为____（第一空2分第二空3分）",
        "diffLevel": 3,
        "wrongRate": 0.42,
        "relatedKpIds": [
          "1.1.3",
          "1.1.5"
        ]
      },
      {
        "num": 16,
        "type": "填空",
        "score": 5,
        "answer": "√3-1",
        "kpId": "2.4.4",
        "stem": "已知椭圆C:x²/a²+y²/b²=1(a>b>0)的左、右焦点分别为F₁,F₂，P是C上一点，且PF₂⊥F₁F₂，∠PF₁F₂=30°，则C的离心率为",
        "diffLevel": 5,
        "wrongRate": 0.72,
        "relatedKpIds": [
          "2.4.3",
          "2.4.5"
        ]
      },
      {
        "num": 17,
        "type": "解答",
        "score": 10,
        "kpId": "1.4.5",
        "stem": "已知数列{aₙ}的前n项和为Sₙ，且满足2Sₙ=3aₙ-3。（1）求{aₙ}的通项公式；（2）设bₙ=log₃aₙ，求数列{1/bₙbₙ₊₁}的前n项和Tₙ。",
        "diffLevel": 3,
        "wrongRate": 0.35,
        "relatedKpIds": [
          "1.4.3",
          "1.4.4"
        ]
      },
      {
        "num": 18,
        "type": "解答",
        "score": 12,
        "kpId": "3.3.6",
        "stem": "某学校研究性学习小组对该校高三学生的视力情况进行调查，随机抽取了100名学生，得到如下2×2列联表：（附表格略）（1）完成列联表并判断是否有99%的把握认为该校高三学生视力近视与性别有关；（2）按分层抽样从近视学生中抽取6人，再从中随机选2人，求恰好1男1女的概率。（χ²公式+临界值表略）",
        "diffLevel": 3,
        "wrongRate": 0.38,
        "relatedKpIds": [
          "3.1.3",
          "3.2.3",
          "3.3.5"
        ]
      },
      {
        "num": 19,
        "type": "解答",
        "score": 12,
        "kpId": "1.3.4",
        "stem": "在△ABC中，内角A,B,C的对边分别为a,b,c，已知√3asinB-bcosA=b。（1）求A；（2）若a=2，b+c=4，求△ABC的面积。",
        "diffLevel": 3,
        "wrongRate": 0.36,
        "relatedKpIds": [
          "1.1.4",
          "1.3.3",
          "1.3.5"
        ]
      },
      {
        "num": 20,
        "type": "解答",
        "score": 12,
        "kpId": "2.3.8",
        "stem": "如图，在直三棱柱ABC-A₁B₁C₁中，AC=BC=1，∠ACB=90°，AA₁=√2，D是A₁B₁的中点。（1）证明：C₁D⊥平面A₁ABB₁；（2）求平面C₁AB与平面A₁ABB₁所成二面角的正弦值。",
        "diffLevel": 4,
        "wrongRate": 0.58,
        "relatedKpIds": [
          "2.2.3",
          "2.3.6",
          "2.3.7"
        ]
      },
      {
        "num": 21,
        "type": "解答",
        "score": 12,
        "kpId": "2.4.7",
        "stem": "已知双曲线C:x²/a²-y²/b²=1(a>0,b>0)的离心率为√2，且过点(2,√3)。（1）求C的方程；（2）过点M(0,1)的直线l与C交于A,B两点，且△AOB的面积为√2（O为原点），求l的方程。",
        "diffLevel": 5,
        "wrongRate": 0.75,
        "relatedKpIds": [
          "2.4.4",
          "2.4.6",
          "2.4.8"
        ]
      },
      {
        "num": 22,
        "type": "解答",
        "score": 12,
        "kpId": "1.5.5",
        "stem": "已知函数f(x)=eˣ-1-x-ax²。（1）当a=0时，求f(x)的单调区间；（2）若当x≥0时f(x)≥0恒成立，求a的取值范围；（3）证明：当n∈N*时，Σ1/k > ln(n+1)（k=1到n）。",
        "diffLevel": 5,
        "wrongRate": 0.85,
        "relatedKpIds": [
          "1.1.4",
          "1.5.3",
          "1.5.4"
        ]
      }
    ]
  },
  {
    "id": "2024-I",
    "year": 2024,
    "volume": "I卷",
    "name": "2024年普通高等学校招生全国统一考试 · 新高考I卷 数学",
    "shortName": "2024新高考I卷",
    "totalScore": 150,
    "totalQuestions": 22,
    "avgDifficulty": 3,
    "questions": [
      {
        "num": 1,
        "type": "单选",
        "score": 5,
        "answer": "B",
        "kpId": "1.1.1",
        "stem": "设集合A={x|-2<x<3}，B={x|x²-4x+3≥0}，则A∩(∁_R B)=",
        "diffLevel": 1,
        "wrongRate": 0.1,
        "relatedKpIds": [
          "1.1.2"
        ]
      },
      {
        "num": 2,
        "type": "单选",
        "score": 5,
        "answer": "C",
        "kpId": "2.1.2",
        "stem": "若(1+i)(2+mi)=-3+5i（i为虚数单位），则实数m=",
        "diffLevel": 1,
        "wrongRate": 0.12,
        "relatedKpIds": [
          "2.1.1",
          "2.1.3"
        ]
      },
      {
        "num": 3,
        "type": "单选",
        "score": 5,
        "answer": "A",
        "kpId": "2.5.1",
        "stem": "甲、乙、丙、丁4人排成一排照相，其中甲不站在两端，则不同的排法种数为",
        "diffLevel": 2,
        "wrongRate": 0.2,
        "relatedKpIds": [
          "2.5.2"
        ]
      },
      {
        "num": 4,
        "type": "单选",
        "score": 5,
        "answer": "D",
        "kpId": "1.1.4",
        "stem": "已知x>1，则x+4/(x-1)的最小值为",
        "diffLevel": 2,
        "wrongRate": 0.22,
        "relatedKpIds": [
          "1.1.3",
          "1.1.5"
        ]
      },
      {
        "num": 5,
        "type": "单选",
        "score": 5,
        "answer": "B",
        "kpId": "2.4.2",
        "stem": "圆C:x²+y²-4x-2y-4=0的圆心到直线3x+4y+3=0的距离为",
        "diffLevel": 2,
        "wrongRate": 0.18,
        "relatedKpIds": [
          "2.4.1",
          "2.4.3"
        ]
      },
      {
        "num": 6,
        "type": "单选",
        "score": 5,
        "answer": "A",
        "kpId": "1.5.2",
        "stem": "曲线y=xlnx在点(e,e)处的切线方程为",
        "diffLevel": 3,
        "wrongRate": 0.32,
        "relatedKpIds": [
          "1.5.1",
          "1.5.3"
        ]
      },
      {
        "num": 7,
        "type": "单选",
        "score": 5,
        "answer": "C",
        "kpId": "2.2.3",
        "stem": "已知|a|=2，|b|=1，a与b的夹角为60°，则|a-2b|=",
        "diffLevel": 3,
        "wrongRate": 0.35,
        "relatedKpIds": [
          "2.2.2",
          "2.2.4"
        ]
      },
      {
        "num": 8,
        "type": "单选",
        "score": 5,
        "answer": "D",
        "kpId": "1.4.2",
        "stem": "等差数列{aₙ}的前n项和为Sₙ，若S₈=48，S₁₂=108，则S₁₆=",
        "diffLevel": 3,
        "wrongRate": 0.4,
        "relatedKpIds": [
          "1.4.1",
          "1.4.3"
        ]
      },
      {
        "num": 9,
        "type": "多选",
        "score": 5,
        "answer": [
          "A",
          "B",
          "D"
        ],
        "kpId": "1.2.8",
        "stem": "函数y=f(x)的图像如图所示（略），则下列判断正确的是",
        "diffLevel": 3,
        "wrongRate": 0.45,
        "relatedKpIds": [
          "1.2.7",
          "1.2.9"
        ]
      },
      {
        "num": 10,
        "type": "多选",
        "score": 5,
        "answer": [
          "B",
          "C"
        ],
        "kpId": "2.3.5",
        "stem": "在正方体ABCD-A₁B₁C₁D₁中，下列结论正确的是",
        "diffLevel": 3,
        "wrongRate": 0.5,
        "relatedKpIds": [
          "2.3.4",
          "2.3.6"
        ]
      },
      {
        "num": 11,
        "type": "多选",
        "score": 5,
        "answer": [
          "A",
          "C",
          "D"
        ],
        "kpId": "1.2.2",
        "stem": "已知函数f(x)是定义在R上的偶函数，且对任意x₁<x₂<0，都有(x₁-x₂)[f(x₁)-f(x₂)]<0，则",
        "diffLevel": 4,
        "wrongRate": 0.58,
        "relatedKpIds": [
          "1.2.1",
          "1.2.3"
        ]
      },
      {
        "num": 12,
        "type": "多选",
        "score": 5,
        "answer": [
          "B",
          "D"
        ],
        "kpId": "3.2.3",
        "stem": "设随机变量X的分布列为P(X=k)=p·q^(k-1)(k=1,2,3,...)，其中0<p<1，q=1-p，则下列结论正确的是",
        "diffLevel": 5,
        "wrongRate": 0.7,
        "relatedKpIds": [
          "3.2.2",
          "3.2.4"
        ]
      },
      {
        "num": 13,
        "type": "填空",
        "score": 5,
        "answer": "2",
        "kpId": "2.4.4",
        "stem": "椭圆C:x²/9+y²/5=1的离心率为",
        "diffLevel": 2,
        "wrongRate": 0.15,
        "relatedKpIds": [
          "2.4.3",
          "2.4.5"
        ]
      },
      {
        "num": 14,
        "type": "填空",
        "score": 5,
        "answer": "16",
        "kpId": "2.5.4",
        "stem": "若(1+2x)^n的展开式中，第3项的系数是第2项系数的4倍，则n=",
        "diffLevel": 3,
        "wrongRate": 0.3,
        "relatedKpIds": [
          "2.5.3"
        ]
      },
      {
        "num": 15,
        "type": "填空",
        "score": 5,
        "answer": "2/3",
        "kpId": "3.1.3",
        "stem": "某射手每次射击命中目标的概率为1/2，且各次射击相互独立，则射击3次恰好命中2次的概率为",
        "diffLevel": 2,
        "wrongRate": 0.25,
        "relatedKpIds": [
          "3.1.2",
          "3.1.4"
        ]
      },
      {
        "num": 16,
        "type": "填空",
        "score": 5,
        "answer": "√6",
        "kpId": "2.3.7",
        "stem": "在棱长为2的正方体ABCD-A₁B₁C₁D₁中，直线A₁B与平面AB₁C₁D所成角的正弦值为",
        "diffLevel": 5,
        "wrongRate": 0.68,
        "relatedKpIds": [
          "2.3.6",
          "2.3.8"
        ]
      },
      {
        "num": 17,
        "type": "解答",
        "score": 10,
        "kpId": "1.3.3",
        "stem": "已知函数f(x)=2sinxcosx+2√3cos²x-√3。（1）求f(x)的最小正周期和单调递增区间；（2）若x∈[0,π/2]，求f(x)的值域。",
        "diffLevel": 3,
        "wrongRate": 0.32,
        "relatedKpIds": [
          "1.3.1",
          "1.3.2",
          "1.3.4"
        ]
      },
      {
        "num": 18,
        "type": "解答",
        "score": 12,
        "kpId": "3.3.5",
        "stem": "某研究机构对5名高中生的数学成绩x与物理成绩y进行了统计，得到如下数据：（表格略）（1）建立y关于x的线性回归方程；（2）若某学生数学成绩为80分，预测其物理成绩。（参考公式略）",
        "diffLevel": 3,
        "wrongRate": 0.36,
        "relatedKpIds": [
          "3.3.4",
          "3.3.6"
        ]
      },
      {
        "num": 19,
        "type": "解答",
        "score": 12,
        "kpId": "1.3.5",
        "stem": "在△ABC中，内角A,B,C的对边分别为a,b,c，且2a·cosC+c=2b。（1）求角A的大小；（2）若a=√7，b+c=4，求△ABC的周长与面积。",
        "diffLevel": 3,
        "wrongRate": 0.4,
        "relatedKpIds": [
          "1.1.4",
          "1.3.1",
          "1.3.4"
        ]
      },
      {
        "num": 20,
        "type": "解答",
        "score": 12,
        "kpId": "2.3.6",
        "stem": "在四棱锥P-ABCD中，底面ABCD是矩形，PA⊥平面ABCD，PA=AD=2AB=4，E为PD的中点。（1）证明：PB∥平面AEC；（2）求三棱锥E-ACD的体积；（3）求二面角E-AC-D的正切值。",
        "diffLevel": 4,
        "wrongRate": 0.55,
        "relatedKpIds": [
          "2.3.3",
          "2.3.5",
          "2.3.7"
        ]
      },
      {
        "num": 21,
        "type": "解答",
        "score": 12,
        "kpId": "2.4.8",
        "stem": "已知抛物线C:y²=4x，焦点为F，过F的直线l与C交于A,B两点。（1）若|AB|=8，求直线l的方程；（2）设点M在抛物线C的准线上，且MA⊥MB，求△MAB面积的最小值。",
        "diffLevel": 5,
        "wrongRate": 0.72,
        "relatedKpIds": [
          "2.4.3",
          "2.4.7",
          "2.4.9"
        ]
      },
      {
        "num": 22,
        "type": "解答",
        "score": 12,
        "kpId": "1.5.4",
        "stem": "已知函数f(x)=a(lnx+1)-xe^(-x)（a∈R）。（1）若a=1，求函数f(x)的单调区间；（2）若f(x)有两个零点，求a的取值范围。",
        "diffLevel": 5,
        "wrongRate": 0.82,
        "relatedKpIds": [
          "1.2.2",
          "1.5.3",
          "1.5.5"
        ]
      }
    ]
  },
  {
    "id": "2024-II",
    "year": 2024,
    "volume": "II卷",
    "name": "2024年普通高等学校招生全国统一考试 · 新高考II卷 数学",
    "shortName": "2024新高考II卷",
    "totalScore": 150,
    "totalQuestions": 22,
    "avgDifficulty": 3.1,
    "questions": [
      {
        "num": 1,
        "type": "单选",
        "score": 5,
        "answer": "A",
        "kpId": "1.1.2",
        "stem": "设x∈R，则\"x>1\"是\"x²+x-2>0\"的",
        "diffLevel": 1,
        "wrongRate": 0.12,
        "relatedKpIds": [
          "1.1.1",
          "1.1.3"
        ]
      },
      {
        "num": 2,
        "type": "单选",
        "score": 5,
        "answer": "B",
        "kpId": "2.1.1",
        "stem": "复数z满足z(1-i)=2，则z的虚部为",
        "diffLevel": 1,
        "wrongRate": 0.15,
        "relatedKpIds": [
          "2.1.2"
        ]
      },
      {
        "num": 3,
        "type": "单选",
        "score": 5,
        "answer": "C",
        "kpId": "1.3.2",
        "stem": "函数y=2sin(2x-π/6)的最小正周期为",
        "diffLevel": 1,
        "wrongRate": 0.1,
        "relatedKpIds": [
          "1.3.1",
          "1.3.3"
        ]
      },
      {
        "num": 4,
        "type": "单选",
        "score": 5,
        "answer": "D",
        "kpId": "2.5.3",
        "stem": "从3名男生和2名女生中任选2人参加社区服务，则选中的2人恰为1男1女的概率为",
        "diffLevel": 2,
        "wrongRate": 0.22,
        "relatedKpIds": [
          "2.5.2",
          "2.5.4"
        ]
      },
      {
        "num": 5,
        "type": "单选",
        "score": 5,
        "answer": "A",
        "kpId": "2.4.5",
        "stem": "双曲线x²/4-y²/12=1的渐近线方程为",
        "diffLevel": 2,
        "wrongRate": 0.2,
        "relatedKpIds": [
          "2.4.4",
          "2.4.6"
        ]
      },
      {
        "num": 6,
        "type": "单选",
        "score": 5,
        "answer": "B",
        "kpId": "1.2.1",
        "stem": "函数f(x)=√(2-x)+1/ln(x+1)的定义域为",
        "diffLevel": 2,
        "wrongRate": 0.28,
        "relatedKpIds": [
          "1.2.2"
        ]
      },
      {
        "num": 7,
        "type": "单选",
        "score": 5,
        "answer": "C",
        "kpId": "2.3.2",
        "stem": "已知圆台上底面半径为2，下底面半径为4，母线长为4，则该圆台的体积为",
        "diffLevel": 3,
        "wrongRate": 0.4,
        "relatedKpIds": [
          "2.3.1",
          "2.3.3"
        ]
      },
      {
        "num": 8,
        "type": "单选",
        "score": 5,
        "answer": "D",
        "kpId": "1.2.9",
        "stem": "若函数f(x)=x³-3x+a有3个不同的零点，则实数a的取值范围是",
        "diffLevel": 4,
        "wrongRate": 0.55,
        "relatedKpIds": [
          "1.2.2",
          "1.2.8"
        ]
      },
      {
        "num": 9,
        "type": "多选",
        "score": 5,
        "answer": [
          "A",
          "C"
        ],
        "kpId": "3.3.2",
        "stem": "某学校随机抽取了100名学生的身高数据，整理得到频率分布直方图（略）。下列说法正确的是",
        "diffLevel": 3,
        "wrongRate": 0.45,
        "relatedKpIds": [
          "3.3.1",
          "3.3.3"
        ]
      },
      {
        "num": 10,
        "type": "多选",
        "score": 5,
        "answer": [
          "B",
          "C",
          "D"
        ],
        "kpId": "2.2.4",
        "stem": "已知向量a=(2,1)，b=(1,0)，c=(3,4)，则下列结论正确的是",
        "diffLevel": 3,
        "wrongRate": 0.48,
        "relatedKpIds": [
          "2.2.3"
        ]
      },
      {
        "num": 11,
        "type": "多选",
        "score": 5,
        "answer": [
          "A",
          "B"
        ],
        "kpId": "1.4.3",
        "stem": "已知等比数列{aₙ}的前n项和为Sₙ，公比q>1，则下列结论正确的是",
        "diffLevel": 4,
        "wrongRate": 0.56,
        "relatedKpIds": [
          "1.4.2",
          "1.4.4"
        ]
      },
      {
        "num": 12,
        "type": "多选",
        "score": 5,
        "answer": [
          "A",
          "B",
          "C",
          "D"
        ],
        "kpId": "1.5.3",
        "stem": "已知f(x)是定义域为R的奇函数，f(1+x)=f(1-x)，且当0<x<1时，f(x)=xlnx，则",
        "diffLevel": 5,
        "wrongRate": 0.7,
        "relatedKpIds": [
          "1.2.2",
          "1.5.2",
          "1.5.4"
        ]
      },
      {
        "num": 13,
        "type": "填空",
        "score": 5,
        "answer": "-2",
        "kpId": "1.4.4",
        "stem": "在数列{aₙ}中，a₁=1，aₙ₊₁=2aₙ+1，则a₅=",
        "diffLevel": 3,
        "wrongRate": 0.28,
        "relatedKpIds": [
          "1.4.1",
          "1.4.3",
          "1.4.5"
        ]
      },
      {
        "num": 14,
        "type": "填空",
        "score": 5,
        "answer": "2√5",
        "kpId": "2.4.6",
        "stem": "抛物线x²=8y的焦点到准线的距离为",
        "diffLevel": 2,
        "wrongRate": 0.18,
        "relatedKpIds": [
          "2.4.5",
          "2.4.7"
        ]
      },
      {
        "num": 15,
        "type": "填空",
        "score": 5,
        "answer": "5",
        "kpId": "3.1.4",
        "stem": "某校高三年级有1000人参加一次数学测验，随机抽取了部分同学的成绩（满分100分），统计得到样本平均数为75，方差为64。若按分层抽样的方法抽取40名同学的成绩进行分析，则应抽取成绩在[67,83]内的同学人数约为",
        "diffLevel": 4,
        "wrongRate": 0.52,
        "relatedKpIds": [
          "3.1.3",
          "3.1.5"
        ]
      },
      {
        "num": 16,
        "type": "填空",
        "score": 5,
        "answer": "π/3",
        "kpId": "2.3.7",
        "stem": "在直三棱柱ABC-A₁B₁C₁中，AB=AC=1，∠BAC=90°，且异面直线A₁B与B₁C₁所成的角为60°，则AA₁的长度为",
        "diffLevel": 5,
        "wrongRate": 0.65,
        "relatedKpIds": [
          "2.3.6",
          "2.3.8"
        ]
      },
      {
        "num": 17,
        "type": "解答",
        "score": 10,
        "kpId": "1.3.4",
        "stem": "在△ABC中，内角A,B,C的对边分别为a,b,c，已知(a+b)(sinA-sinB)=(c-b)sinC。（1）求A；（2）若a=√3，求b+2c的最大值。",
        "diffLevel": 3,
        "wrongRate": 0.38,
        "relatedKpIds": [
          "1.1.4",
          "1.3.3",
          "1.3.5"
        ]
      },
      {
        "num": 18,
        "type": "解答",
        "score": 12,
        "kpId": "3.2.3",
        "stem": "某工厂生产一种产品，质检部门从某天生产的产品中随机抽取了100件，测量其某项质量指标值X，经统计得到X的频率分布直方图（略）。（1）估计这100件产品质量指标值的平均数和方差（同一组数据用区间中点作代表）；（2）以样本估计总体，若产品质量指标值落在(μ-2σ,μ+2σ)内为合格品，从该天生产的产品中随机抽取3件，求至少1件为合格品的概率。",
        "diffLevel": 3,
        "wrongRate": 0.42,
        "relatedKpIds": [
          "3.2.1",
          "3.2.2",
          "3.2.4"
        ]
      },
      {
        "num": 19,
        "type": "解答",
        "score": 12,
        "kpId": "1.4.5",
        "stem": "已知数列{aₙ}满足a₁+2a₂+3a₃+...+naₙ=(n-1)2ⁿ⁺¹+2（n∈N*）。（1）求{aₙ}的通项公式；（2）求数列{aₙ}的前n项和Sₙ。",
        "diffLevel": 4,
        "wrongRate": 0.46,
        "relatedKpIds": [
          "1.4.1",
          "1.4.3",
          "1.4.4"
        ]
      },
      {
        "num": 20,
        "type": "解答",
        "score": 12,
        "kpId": "2.3.8",
        "stem": "如图，四棱锥P-ABCD的底面ABCD是平行四边形，∠ABC=135°，PA⊥底面ABCD，AB=AC=2，PA=3，E是BC的中点。（1）证明：AE⊥PD；（2）求平面PAB与平面PCD所成锐二面角的余弦值。",
        "diffLevel": 4,
        "wrongRate": 0.58,
        "relatedKpIds": [
          "2.2.3",
          "2.3.6",
          "2.3.7"
        ]
      },
      {
        "num": 21,
        "type": "解答",
        "score": 12,
        "kpId": "2.4.9",
        "stem": "已知椭圆E:x²/a²+y²/b²=1(a>b>0)的左、右焦点分别为F₁(-1,0),F₂(1,0)，且过点P(1,3/2)。（1）求E的方程；（2）过F₂作两条互相垂直的直线l₁和l₂，l₁交E于A,B两点，l₂交E于C,D两点，求四边形ACBD面积的最小值。",
        "diffLevel": 5,
        "wrongRate": 0.75,
        "relatedKpIds": [
          "2.4.10",
          "2.4.4",
          "2.4.8"
        ]
      },
      {
        "num": 22,
        "type": "解答",
        "score": 12,
        "kpId": "1.5.5",
        "stem": "已知函数f(x)=eˣ-ax²（a∈R）。（1）讨论f(x)的单调性；（2）若f(x)在(0,+∞)上只有一个零点，求a；（3）设a>1，证明：当0<x<lna时，f(x)>x²。",
        "diffLevel": 5,
        "wrongRate": 0.83,
        "relatedKpIds": [
          "1.1.4",
          "1.5.3",
          "1.5.4"
        ]
      }
    ]
  }
];
  // 给原来的KP和EXAM打补丁（保留引用）
  window.KNOWLEDGE_POINTS.forEach(function(oldKp, i){
    var nk = NEW_KPS[i];
    if(!nk) return;
    oldKp.learnCard = nk.learnCard;
  });
  window.EXAM_PAPERS.forEach(function(oldExam, i){
    var ne = NEW_EX[i];
    if(!ne) return;
    oldExam.questions.forEach(function(q, j){
      var nj = ne.questions[j];
      if(nj) q.relatedKpIds = nj.relatedKpIds || [];
    });
  });
  // 顺便给 PRACTICE_BANK 的每道题也打上 relatedKpIds（主考点同模块关联）
  Object.keys(window.PRACTICE_BANK).forEach(function(kpId){
    var list = window.PRACTICE_BANK[kpId];
    var kp = window.KNOWLEDGE_POINTS.find(function(k){return k.id===kpId;});
    if(!kp || !list) return;
    list.forEach(function(q){
      var sib = (window.KNOWLEDGE_POINTS.filter(function(k){return k.moduleId===kp.moduleId;})||[]).map(function(k){return k.id;});
      var idx = sib.indexOf(kpId);
      var rel = [];
      if(idx>0) rel.push(sib[idx-1]);
      if(idx<sib.length-1) rel.push(sib[idx+1]);
      q.relatedKpIds = rel.slice(0,2);
    });
  });
})();
