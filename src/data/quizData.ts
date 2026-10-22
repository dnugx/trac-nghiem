export interface Question {
  id: number;
  topic: string;
  q: string;
  a: string[];
  correct: number;
  explanation: string;
  quote?: string;
  difficulty?: 'Dễ' | 'Trung bình' | 'Nâng cao';
}

export const TOPIC_NAMES = {
  all: 'Toàn bộ câu hỏi (16 câu)',
  base_superstructure: 'Cơ sở hạ tầng & Kiến trúc thượng tầng (8 câu)',
  laws_materialism: 'Quy luật biện chứng & Nhận thức luận (8 câu)',
};

export const CORE_QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Cơ sở hạ tầng theo triết học Mác - Lênin là gì?',
    a: [
      'Hệ thống đường xá, cầu cống xã hội',
      'Quan hệ sản xuất hợp thành cơ cấu kinh tế',
      'Hệ thống chính trị và pháp luật',
      'Toàn bộ lực lượng sản xuất xã hội',
    ],
    correct: 1,
    explanation: 'Cơ sở hạ tầng là toàn bộ những quan hệ sản xuất của một xã hội trong sự vận động hiện thực của chúng hợp thành cơ cấu kinh tế của xã hội đó (gồm: QHSX thống trị, QHSX tàn dư và QHSX mầm mống). Trong triết học, nó không đồng nghĩa với hạ tầng kỹ thuật (cầu đường, bến cảng).',
    quote: 'Sự tổng hợp toàn bộ những quan hệ sản xuất ấy tạo thành cơ cấu kinh tế của xã hội, tức là cái cơ sở hiện thực trên đó xây dựng lên một kiến trúc thượng tầng pháp lý và chính trị. — C. Mác',
    difficulty: 'Trung bình',
  },
  {
    id: 2,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Kiến trúc thượng tầng bao gồm những yếu tố nào?',
    a: [
      'Lực lượng sản xuất và quan hệ sản xuất',
      'Công cụ lao động và người lao động',
      'Quan điểm, tư tưởng và thiết chế tương ứng',
      'Chỉ bao gồm nhà nước và pháp luật',
    ],
    correct: 2,
    explanation: 'Kiến trúc thượng tầng là toàn bộ những quan điểm, tư tưởng xã hội (chính trị, pháp quyền, triết học, đạo đức, tôn giáo, nghệ thuật...) cùng với các thiết chế xã hội tương ứng (nhà nước, đảng phái, giáo hội, các đoàn thể...) được hình thành trên một cơ sở hạ tầng nhất định.',
    quote: 'Nhà nước là bộ phận quyền lực mạnh nhất trong kiến trúc thượng tầng chính trị của xã hội có giai cấp. — V.I. Lênin',
    difficulty: 'Dễ',
  },
  {
    id: 3,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Yếu tố nào giữ vai trò quyết định đối với kiến trúc thượng tầng?',
    a: [
      'Điều kiện tự nhiên',
      'Cơ sở hạ tầng',
      'Ý muốn chủ quan của con người',
      'Truyền thống văn hóa',
    ],
    correct: 1,
    explanation: 'Chủ nghĩa duy vật lịch sử khẳng định: Cơ sở hạ tầng quyết định kiến trúc thượng tầng. Cơ sở hạ tầng sinh ra kiến trúc thượng tầng tương ứng; tính chất của KTTT do tính chất của CSHT quyết định.',
    quote: 'Cơ sở kinh tế thay đổi thì toàn bộ cái kiến trúc thượng tầng đồ sộ cũng bị đảo lộn ít nhiều nhanh chóng. — C. Mác',
    difficulty: 'Dễ',
  },
  {
    id: 4,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Khi cơ sở hạ tầng thay đổi căn bản, điều gì thường xảy ra?',
    a: [
      'Kiến trúc thượng tầng không đổi',
      'Mọi thiết chế thay đổi lập tức',
      'Kiến trúc thượng tầng sớm muộn sẽ đổi theo',
      'Kinh tế không còn vai trò quyết định',
    ],
    correct: 2,
    explanation: 'Khi cơ sở hạ tầng biến đổi thì sớm hay muộn kiến trúc thượng tầng cũng biến đổi theo. Sự biến đổi này diễn ra phức tạp, có yếu tố thay đổi nhanh chóng (như chính trị, pháp luật), có yếu tố thay đổi chậm hơn (tâm lý, tôn giáo, đạo đức).',
    quote: 'Sự phát triển của các hình thái kinh tế - xã hội là một quá trình lịch sử - tự nhiên. — C. Mác',
    difficulty: 'Trung bình',
  },
  {
    id: 5,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Kiến trúc thượng tầng tác động trở lại cơ sở hạ tầng như thế nào?',
    a: [
      'Luôn thúc đẩy kinh tế phát triển',
      'Luôn kìm hãm kinh tế phát triển',
      'Có thể thúc đẩy hoặc kìm hãm tùy sự phù hợp',
      'Không có bất kỳ tác động nào',
    ],
    correct: 2,
    explanation: 'KTTT có tính độc lập tương đối và tác động trở lại mạnh mẽ đối với CSHT. Nếu KTTT phù hợp với quy luật kinh tế khách quan thì nó thúc đẩy kinh tế phát triển; nếu không phù hợp hoặc phản tiến bộ thì nó kìm hãm sự phát triển của CSHT.',
    quote: 'Sự phát triển chính trị, pháp luật, triết học, tôn giáo, văn học, nghệ thuật... đều dựa trên cơ sở kinh tế. Nhưng chúng đều ảnh hưởng lẫn nhau và ảnh hưởng đến cơ sở kinh tế. — Ph. Ăng-ghen',
    difficulty: 'Trung bình',
  },
  {
    id: 6,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Ví dụ nào thể hiện kiến trúc thượng tầng tác động tích cực?',
    a: [
      'Thủ tục hành chính phức tạp tăng chi phí',
      'Pháp luật minh bạch giúp khuyến khích đầu tư',
      'Chính sách không phù hợp gây khó khăn',
      'Bỏ qua điều kiện kinh tế khi lập chính sách',
    ],
    correct: 1,
    explanation: 'Hệ thống pháp luật minh bạch, cải cách thủ tục hành chính, bảo vệ quyền sở hữu và tự do kinh doanh là bộ phận kiến trúc thượng tầng tiến bộ, tạo hành lang thông thoáng thúc đẩy cơ sở hạ tầng kinh tế phát triển.',
    quote: 'Pháp luật là ý chí của giai cấp thống trị được đề lên thành luật, phản ánh những điều kiện sinh hoạt vật chất của xã hội.',
    difficulty: 'Dễ',
  },
  {
    id: 7,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Trong thời kỳ đổi mới, sự phát triển kinh tế thị trường đặt ra yêu cầu gì?',
    a: [
      'Giữ nguyên mọi cơ chế quản lý cũ',
      'Không cần sửa đổi pháp luật',
      'Hoàn thiện thể chế kinh tế, pháp luật',
      'Xóa bỏ vai trò quản lý của Nhà nước',
    ],
    correct: 2,
    explanation: 'Sự phát triển nền kinh tế thị trường định hướng XHCN đòi hỏi Việt Nam phải không ngừng hoàn thiện thể chế kinh tế, cải cách tư pháp, nâng cao hiệu lực của Nhà nước pháp quyền XHCN để KTTT tương thích và phục vụ đắc lực cho CSHT.',
    quote: 'Đổi mới kinh tế phải đi đôi với từng bước đổi mới chính trị, xây dựng Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân.',
    difficulty: 'Trung bình',
  },
  {
    id: 8,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Ý nghĩa phương pháp luận quan trọng nhất của mối quan hệ này là gì?',
    a: [
      'Thay đổi tư tưởng là kinh tế phát triển',
      'Xuất phát từ thực tiễn, phát huy thượng tầng',
      'Chỉ chú trọng kinh tế, bỏ qua pháp luật',
      'Áp dụng mọi chính sách bất kể thực tế',
    ],
    correct: 1,
    explanation: 'Ý nghĩa phương pháp luận: Khi hoạch định chủ trương, chính sách phải luôn xuất phát từ thực tiễn cơ sở kinh tế vật chất; đồng thời chủ động phát huy vai trò tích cực của nhà nước, pháp luật, tư tưởng để định hướng và dẫn dắt kinh tế.',
    quote: 'Ý kiến, tư tưởng nếu không thấu suốt vào thực tiễn vật chất thì không thể biến thành sức mạnh vật chất được. — C. Mác',
    difficulty: 'Nâng cao',
  },
  // Additional rich questions
  {
    id: 9,
    topic: 'Quy luật biện chứng & Nhận thức luận',
    q: 'Theo chủ nghĩa duy vật biện chứng, vật chất và ý thức có mối quan hệ như thế nào?',
    a: [
      'Ý thức sinh ra và quyết định hoàn toàn vật chất',
      'Vật chất quyết định ý thức, ý thức tác động trở lại',
      'Vật chất và ý thức hoàn toàn độc lập, tách rời',
      'Vật chất chỉ là sản phẩm tưởng tượng của ý thức',
    ],
    correct: 1,
    explanation: 'Chủ nghĩa duy vật biện chứng khẳng định vật chất có trước, sinh ra và quyết định ý thức; nhưng ý thức có tính độc lập tương đối và tác động trở lại thế giới vật chất thông qua hoạt động thực tiễn của con người.',
    quote: 'Vật chất là một phạm trù triết học dùng để chỉ thực tại khách quan được đem lại cho con người trong cảm giác... — V.I. Lênin',
    difficulty: 'Dễ',
  },
  {
    id: 10,
    topic: 'Quy luật biện chứng & Nhận thức luận',
    q: 'Quy luật nào chỉ ra NGUỒN GỐC và ĐỘNG LỰC của sự vận động, phát triển?',
    a: [
      'Quy luật chuyển hóa từ lượng sang chất',
      'Quy luật thống nhất và đấu tranh của các mặt đối lập',
      'Quy luật phủ định của phủ định',
      'Quy luật giá trị thặng dư',
    ],
    correct: 1,
    explanation: 'Quy luật mâu thuẫn (thống nhất và đấu tranh của các mặt đối lập) là hạt nhân của phép biện chứng, vạch ra nguồn gốc, động lực bên trong của mọi quá trình vận động và phát triển.',
    quote: 'Sự phát triển là một cuộc đấu tranh giữa các mặt đối lập. — V.I. Lênin',
    difficulty: 'Trung bình',
  },
  {
    id: 11,
    topic: 'Quy luật biện chứng & Nhận thức luận',
    q: 'Quy luật chuyển hóa từ những thay đổi về lượng thành những thay đổi về chất chỉ ra điều gì?',
    a: [
      'Khuynh hướng của sự phát triển',
      'Nguồn gốc của sự phát triển',
      'Cách thức vận động và phát triển của sự vật',
      'Mục đích của sự phát triển',
    ],
    correct: 2,
    explanation: 'Quy luật Lượng - Chất vạch ra cách thức của sự vận động và phát triển: tích lũy dần dần về lượng đạt tới điểm nút dẫn đến bước nhảy làm biến đổi về chất.',
    quote: 'Chất là tính quy định khách quan vốn có của sự vật, là sự thống nhất hữu cơ của các thuộc tính... — Ph. Ăng-ghen',
    difficulty: 'Trung bình',
  },
  {
    id: 12,
    topic: 'Quy luật biện chứng & Nhận thức luận',
    q: 'Quy luật phủ định của phủ định chỉ ra đặc điểm nào của sự phát triển?',
    a: [
      'Phát triển theo đường thẳng tắp không ngừng',
      'Khuynh hướng phát triển theo đường xoáy ốc',
      'Quay trở lại điểm xuất phát ban đầu nguyên vẹn',
      'Sự diệt vong hoàn toàn không kế thừa',
    ],
    correct: 1,
    explanation: 'Quy luật phủ định của phủ định chỉ ra khuynh hướng của sự phát triển: diễn ra theo đường xoáy trôn ốc đi lên, có tính kế thừa những yếu tố tích cực của cái cũ.',
    quote: 'Sự phát triển dường như lặp lại những giai đoạn đã qua, nhưng dưới một hình thức cao hơn. — V.I. Lênin',
    difficulty: 'Trung bình',
  },
  {
    id: 13,
    topic: 'Quy luật biện chứng & Nhận thức luận',
    q: 'Tiêu chuẩn cao nhất để kiểm tra chân lý trong nhận thức luận Mác - Lênin là gì?',
    a: [
      'Số đông người đồng thuận tin theo',
      'Ý kiến của các bậc vĩ nhân, hiền triết',
      'Thực tiễn lịch sử - xã hội',
      'Sự lập luận logic thuần túy trên sách vở',
    ],
    correct: 2,
    explanation: 'Thực tiễn là cơ sở, động lực, mục đích của nhận thức và là tiêu chuẩn khách quan duy nhất để kiểm tra chân lý.',
    quote: 'Vấn đề tìm hiểu xem tư duy của con người có thể đạt tới chân lý khách quan hay không, hoàn toàn không phải là một vấn đề lý luận, mà là một vấn đề thực tiễn. — C. Mác',
    difficulty: 'Dễ',
  },
  {
    id: 14,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Trong cơ cấu của hình thái kinh tế - xã hội, yếu tố nào là nền tảng sâu xa nhất?',
    a: [
      'Ý thức xã hội và văn hóa tư tưởng',
      'Lực lượng sản xuất',
      'Hệ thống chính trị và nhà nước',
      'Bộ máy pháp luật',
    ],
    correct: 1,
    explanation: 'Lực lượng sản xuất là yếu tố động nhất, cách mạng nhất, là nền tảng vật chất - kỹ thuật sâu xa quyết định sự hình thành và biến đổi của quan hệ sản xuất và toàn bộ đời sống xã hội.',
    quote: 'Cái cối xay quay bằng tay đưa lại xã hội có lãnh chúa; cái cối xay chạy bằng hơi nước đưa lại xã hội có nhà tư bản công nghiệp. — C. Mác',
    difficulty: 'Trung bình',
  },
  {
    id: 15,
    topic: 'Cơ sở hạ tầng & Kiến trúc thượng tầng',
    q: 'Bản chất của con người theo quan điểm của Các Mác là gì?',
    a: [
      'Một bản tính trừu tượng bẩm sinh cố định',
      'Tổng hòa các quan hệ xã hội',
      'Ý chí tự do thuần túy tách rời hoàn cảnh',
      'Chỉ là sinh vật sinh học thuần túy',
    ],
    correct: 1,
    explanation: 'Trong Luận cương về Phoi-ơ-bắc (1845), Các Mác viết: "Bản chất con người không phải là một cái gì trừu tượng, cố hữu của cá nhân riêng biệt. Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội".',
    quote: 'Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội. — C. Mác',
    difficulty: 'Dễ',
  },
  {
    id: 16,
    topic: 'Quy luật biện chứng & Nhận thức luận',
    q: 'Phương pháp biện chứng duy vật đối lập căn bản với phương pháp tư duy nào?',
    a: [
      'Phương pháp siêu hình',
      'Phương pháp phân tích khoa học',
      'Phương pháp tổng hợp tài liệu',
      'Phương pháp thực nghiệm',
    ],
    correct: 0,
    explanation: 'Phương pháp biện chứng xem xét sự vật trong mối liên hệ phổ biến và sự phát triển không ngừng; trái lại phương pháp siêu hình xem xét sự vật cô lập, bất biến, phiến diện.',
    quote: 'Phương pháp biện chứng nắm bắt các sự vật và những phản ánh của chúng trong tư tưởng, trong mối liên hệ qua lại, trong sự vận động, phát sinh và tiêu vong của chúng. — Ph. Ăng-ghen',
    difficulty: 'Dễ',
  },
];

export interface InfographicHotspot {
  id: string;
  title: string;
  category: 'Cơ sở hạ tầng' | 'Kiến trúc thượng tầng' | 'Quy luật biện chứng';
  badge: string;
  description: string;
  examples: string[];
}

export const INFOGRAPHIC_DETAILS: InfographicHotspot[] = [
  {
    id: 'csht',
    title: 'Cơ sở hạ tầng (Economic Base)',
    category: 'Cơ sở hạ tầng',
    badge: 'Nền tảng kinh tế vật chất',
    description: 'Toàn bộ các quan hệ sản xuất hợp thành cơ cấu kinh tế của xã hội, gồm 3 bộ phận: QHSX thống trị, QHSX tàn dư và QHSX mầm mống.',
    examples: [
      'Quan hệ sở hữu tư liệu sản xuất (nhà nước, tập thể, tư nhân)',
      'Quan hệ tổ chức và quản lý sản xuất',
      'Quan hệ phân phối sản phẩm lao động',
    ],
  },
  {
    id: 'kttt',
    title: 'Kiến trúc thượng tầng (Superstructure)',
    category: 'Kiến trúc thượng tầng',
    badge: 'Hệ thống chính trị - tư tưởng',
    description: 'Toàn bộ quan điểm, tư tưởng xã hội (chính trị, pháp luật, đạo đức, tôn giáo, nghệ thuật, triết học) và các thiết chế tương ứng (Nhà nước, Đảng, tổ chức đoàn thể).',
    examples: [
      'Nhà nước pháp quyền, Quân đội, Tòa án, Viện kiểm sát',
      'Hệ thống hiến pháp, luật lệ, quy chuẩn hành chính',
      'Hệ tư tưởng Mác - Lênin, nền tảng tinh thần xã hội',
    ],
  },
  {
    id: 'llsx',
    title: 'Lực lượng sản xuất (Productive Forces)',
    category: 'Cơ sở hạ tầng',
    badge: 'Động lực phát triển vật chất',
    description: 'Mối quan hệ giữa con người với giới tự nhiên trong quá trình sản xuất. Gồm: Người lao động (kinh nghiệm, kỹ năng) và Tư liệu sản xuất (công cụ lao động, đối tượng lao động).',
    examples: [
      'Người công nhân, kỹ sư, nhà khoa học với tri thức hiện đại',
      'Máy móc, công nghệ AI, tự động hóa, dây chuyền công nghiệp',
      'Tài nguyên thiên nhiên và nguyên vật liệu chế biến',
    ],
  },
  {
    id: 'relation',
    title: 'Quy luật tác động biện chứng hai chiều',
    category: 'Quy luật biện chứng',
    badge: 'Vật chất quyết định ý thức',
    description: 'Cơ sở hạ tầng quyết định kiến trúc thượng tầng (nguồn gốc, nội dung, tính chất). Kiến trúc thượng tầng tác động trở lại mạnh mẽ (thúc đẩy hoặc kìm hãm) thông qua vai trò của Nhà nước và Pháp luật.',
    examples: [
      'Khi kinh tế chuyển từ bao cấp sang thị trường, luật pháp và cơ chế quản lý nhà nước phải đổi mới theo',
      'Chính sách kinh tế đúng đắn giải phóng sức sản xuất và thúc đẩy tăng trưởng mạnh mẽ',
    ],
  },
];
