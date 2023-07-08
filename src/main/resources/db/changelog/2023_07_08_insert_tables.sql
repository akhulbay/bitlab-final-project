--liquibase formatted sql

--changeset akhulbay:1
INSERT INTO t_blog_category (name)
VALUES ('Education'),
       ('Business'),
       ('Information'),
       ('Interview'),
       ('Travel'),
       ('Jobs'),
       ('Fashion');

--changeset akhulbay:2
INSERT INTO t_general_category (name)
VALUES ('Accounting'),
       ('IT & Software'),
       ('Marketing'),
       ('Banking'),
       ('Digital & Creative'),
       ('Retail'),
       ('Management'),
       ('Human Resources');

--changeset akhulbay:3
INSERT INTO t_user (username, first_name, last_name, password, role, blocked)
VALUES ('admin1@gmail.com', 'Chingiz', 'Akhulbay', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_ADMIN', false),
       ('john.doe@example.com', 'John', 'Doe', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_EMPLOYER', false),
       ('emily.smith@example.com', 'Emily', 'Smith', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_EMPLOYER', false),
       ('michael.johnson@example.com', 'Michael', 'Johnson',
        '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq', 'ROLE_EMPLOYER', false),
       ('sarah.davis@example.com', 'Sarah', 'Davis', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_EMPLOYER', false),
       ('james.wilson@example.com', 'James', 'Wilson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_EMPLOYER', false),
       ('olivia.johnson@example.com', 'Olivia', 'Johnson',
        '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq', 'ROLE_EMPLOYER', false),
       ('william.smith@example.com', 'William', 'Smith', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_EMPLOYER', false),
       ('isabella.miller@example.com', 'Isabella', 'Miller',
        '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq', 'ROLE_EMPLOYER', false),
       ('benjamin.johnson@example.com', 'Benjamin', 'Johnson',
        '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq', 'ROLE_EMPLOYER', false),
       ('mia.anderson@example.com', 'Mia', 'Anderson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_EMPLOYER', false),
       ('ethan.wilson@example.com', 'Ethan', 'Wilson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('ava.johnson@example.com', 'Ava', 'Johnson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('noah.anderson@example.com', 'Noah', 'Anderson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('sophia.brown@example.com', 'Sophia', 'Brown', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('logan.davis@example.com', 'Logan', 'Davis', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('mia.johnson@example.com', 'Mia', 'Johnson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('lucas.wilson@example.com', 'Lucas', 'Wilson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('amelia.smith@example.com', 'Amelia', 'Smith', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('oliver.brown@example.com', 'Oliver', 'Brown', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('emily.miller@example.com', 'Emily', 'Miller', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('henry.davis@example.com', 'Henry', 'Davis', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('emma.wilson@example.com', 'Emma', 'Wilson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('liam.miller@example.com', 'Liam', 'Miller', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('ava.brown@example.com', 'Ava', 'Brown', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('ethan.johnson@example.com', 'Ethan', 'Johnson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('olivia.davis@example.com', 'Olivia', 'Davis', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('noah.wilson@example.com', 'Noah', 'Wilson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('isabella.smith@example.com', 'Isabella', 'Smith',
        '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq', 'ROLE_USER', false),
       ('jackson.davis@example.com', 'Jackson', 'Davis', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('sophia.wilson@example.com', 'Sophia', 'Wilson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('aiden.johnson@example.com', 'Aiden', 'Johnson', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false),
       ('mia.smith@example.com', 'Mia', 'Smith', '$2a$12$KAmLzVLIDG96lw3qa/kE.uIPBI19ZnvaY5HxQu83mjtRJjh5TvmLq',
        'ROLE_USER', false);

--changeset akhulbay:4
INSERT INTO t_company (about_company, employees_number, establish_date, image, linkedin_link, location, name,
                       owner_name, website, whatsapp_link, user_id)
VALUES ('<!-- html tags are allowed -->
<p>Google is a multinational technology company specializing in Internet-related services and products.</p>
<p>With a diverse portfolio, Google offers a range of innovative solutions to users worldwide.</p>',
        200000, '1998-09-04', 'google-logo.png', 'https://www.linkedin.com/company/google', 'Almaty',
        'Google', 'Sundar Pichai', 'https://www.google.com', 'https://wa.me/123456789', 2),

       ('<!-- html tags are allowed -->
<p>Amazon is a multinational conglomerate focusing on e-commerce, cloud computing, and digital streaming.</p>
<p>Through its various services, Amazon has become one of the world''s largest online retailers.</p>',
        1500000, '1994-07-05', 'amazon-logo.jpg', 'https://www.linkedin.com/company/amazon', 'Astana',
        'Amazon', 'Andy Jassy', 'https://www.amazon.com', 'https://wa.me/123456789', 3),

       ('<!-- html tags are allowed -->
<p>Microsoft is a global technology company known for its software, hardware, and cloud services.</p>
<p>Microsoft provides a wide range of products and solutions for individuals and businesses.</p>',
        175000, '1975-04-04', 'microsoft.png', 'https://www.linkedin.com/company/microsoft', 'Shymkent',
        'Microsoft', 'Satya Nadella', 'https://www.microsoft.com', 'https://wa.me/123456789', 4),

       ('<!-- html tags are allowed -->
<p>Apple is a multinational technology company renowned for its consumer electronics and software.</p>
<p>Apple''s products and services have revolutionized the way we interact with technology.</p>',
        147000, '1976-04-01', 'apple.png', 'https://www.linkedin.com/company/apple', 'Aktau',
        'Apple', 'Tim Cook', 'https://www.apple.com', 'https://wa.me/123456789', 5),

       ('<!-- html tags are allowed -->
<p>Facebook is a social media and technology company connecting billions of people worldwide.</p>
<p>Through its platforms, Facebook enables communication, networking, and sharing of information.</p>',
        60000, '2004-02-04', 'facebook.png', 'https://www.linkedin.com/company/facebook', 'Almaty',
        'Facebook', 'Mark Zuckerberg', 'https://www.facebook.com', 'https://wa.me/123456789', 6),

       ('<!-- html tags are allowed -->
<p>Netflix is a global streaming entertainment service offering a wide range of movies and TV shows.</p>
<p>With its original content, Netflix has revolutionized the way we consume entertainment.</p>',
        10000, '1997-08-29', 'netflix.png', 'https://www.linkedin.com/company/netflix', 'Astana',
        'Netflix', 'Reed Hastings', 'https://www.netflix.com', 'https://wa.me/123456789', 7),

       ('<!-- html tags are allowed -->
<p>Tesla is an electric vehicle and clean energy company pushing the boundaries of transportation.</p>
<p>Tesla''s innovative products aim to accelerate the world''s transition to sustainable energy.</p>',
        48000, '2003-07-01', 'tesla.png', 'https://www.linkedin.com/company/tesla', 'Almaty',
        'Tesla', 'Elon Musk', 'https://www.tesla.com', 'https://wa.me/123456789', 8),

       ('<!-- html tags are allowed -->
<p>Intel is a global technology company manufacturing semiconductors and related products.</p>
<p>Intel''s processors power a wide range of devices and technologies around the world.</p>',
        110000, '1968-07-18', 'intel.png', 'https://www.linkedin.com/company/intel', 'Atyrau',
        'Intel', 'Pat Gelsinger', 'https://www.intel.com', 'https://wa.me/123456789', 9),

       ('<!-- html tags are allowed -->
<p>IBM is a multinational technology company offering a wide range of hardware, software, and services.</p>
<p>IBM has a long history of innovation and is known for its contributions to the IT industry.</p>',
        352600, '1911-06-16', 'ibm.png', 'https://www.linkedin.com/company/ibm', 'Shymkent',
        'IBM', 'Arvind Krishna', 'https://www.ibm.com', 'https://wa.me/123456789', 10),

       ('<!-- html tags are allowed -->
<p>Oracle is a global technology company providing database software, cloud services, and enterprise solutions.</p>
<p>Oracle helps businesses manage and leverage their data to drive innovation and growth.</p>',
        138000, '1977-06-16', 'oracle.png', 'https://www.linkedin.com/company/oracle', 'Astana',
        'Oracle', 'Larry Ellison', 'https://www.oracle.com', 'https://wa.me/123456789', 11);

--changeset akhulbay:5
INSERT INTO t_job (city, created_at, description, experience, key_skills, offered_salary, position, qualification,
                   required_skills, responsibilities, title, work_schedule, category_id, company_id)
VALUES ('Almaty', '2023-07-08', '<p>We are looking for a talented Accountant to join our team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Manage financial records and transactions</li>
  <li>Prepare financial statements</li>
  <li>Perform budgeting and forecasting</li>
</ul>', '1-3', 'Knowledge of accounting principles, Proficiency in Excel, QuickBooks',
        4000, 'Junior', 'Bachelor', 'Knowledge of GAAP; Attention to detail; Effective communication skills',
        'Prepare financial reports; Process invoices and payments', 'Junior Accountant', 'FULL_TIME', 1, 1),

       ('Astana', '2023-07-08', '<p>We are seeking a talented Software Engineer to join our dynamic team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Develop and maintain software applications</li>
  <li>Collaborate with cross-functional teams</li>
  <li>Write clean and efficient code</li>
</ul>', '3-6', 'Java, Python, JavaScript', 7000, 'Senior', 'Master',
        'Strong problem-solving skills; Experience with Agile methodologies',
        'Design and implement software solutions; Perform code reviews', 'Senior Software Engineer', 'FULL_TIME', 2, 2),

       ('Shymkent', '2023-07-08', '<p>We are looking for a creative and passionate Marketing Specialist.</p>
<p>Responsibilities:</p>
<ul>
  <li>Develop and implement marketing strategies</li>
  <li>Create engaging content for various channels</li>
  <li>Analyze market trends and competitors</li>
</ul>', '1-3', 'Digital marketing, Social media management', 3500, 'Trainee', 'Bachelor',
        'Strong analytical skills; Excellent written and verbal communication',
        'Plan and execute marketing campaigns; Monitor campaign performance', 'Marketing Specialist', 'FULL_TIME', 3,
        3),

       ('Aktau', '2023-07-08', '<p>We are seeking a skilled Banking Analyst to join our team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Analyze financial data and trends</li>
  <li>Prepare financial models and reports</li>
  <li>Assess risk and recommend strategies</li>
</ul>', '3-6', 'Financial analysis, Risk management', 6000, 'Middle', 'Master',
        'In-depth knowledge of banking regulations; Strong analytical skills',
        'Conduct financial analysis; Evaluate loan applications', 'Senior Banking Analyst', 'FULL_TIME', 4, 4),

       ('Atyrau', '2023-07-08', '<p>We are looking for a talented Graphic Designer to join our creative team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Create visually appealing designs</li>
  <li>Collaborate with marketing team</li>
  <li>Produce high-quality graphics</li>
</ul>', '1-3', 'Adobe Creative Suite, Graphic design principles', 3000, 'Junior', 'Bachelor',
        'Creativity; Attention to detail', 'Design marketing materials; Illustrate concepts',
        'Junior Graphic Designer', 'FULL_TIME', 5, 5),

       ('Almaty', '2023-07-08', '<p>We are seeking an experienced Retail Manager to oversee our operations.</p>
<p>Responsibilities:</p>
<ul>
  <li>Manage store operations</li>
  <li>Monitor inventory and sales</li>
  <li>Train and supervise staff</li>
</ul>', '3-6', 'Retail management, Sales analysis', 5000, 'Middle', 'Master',
        'Leadership skills; Customer service orientation',
        'Develop and implement sales strategies; Ensure store profitability', 'Senior Retail Manager', 'FULL_TIME', 6,
        6),

       ('Astana', '2023-07-08', '<p>We are looking for a talented Project Manager to lead our team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Manage project timelines and resources</li>
  <li>Coordinate cross-functional teams</li>
  <li>Monitor project progress and quality</li>
</ul>', '3-6', 'Project management, Agile methodologies', 7000, 'Senior', 'PhD',
        'Strong organizational skills; Effective communication',
        'Define project scope and objectives; Monitor and report on project status', 'Senior Project Manager',
        'FULL_TIME', 7, 7),

       ('Shymkent', '2023-07-08', '<p>We are seeking an HR Specialist to support our HR functions.</p>
<p>Responsibilities:</p>
<ul>
  <li>Recruit and onboard new employees</li>
  <li>Administer employee benefits</li>
  <li>Manage HR policies and procedures</li>
</ul>', '1-3', 'HR administration, Recruitment process', 2500, 'Trainee', 'Bachelor',
        'Strong organizational skills; Attention to detail',
        'Manage recruitment process; Maintain employee records', 'HR Specialist', 'FULL_TIME', 8, 8),

       ('Aktau', '2023-07-08', '<p>We are looking for a talented UX Designer to join our design team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Create user-centered designs</li>
  <li>Conduct user research and testing</li>
  <li>Collaborate with cross-functional teams</li>
</ul>', '3-6', 'User research, Prototyping tools', 4500, 'Middle', 'Master',
        'Strong problem-solving skills; Attention to detail',
        'Design intuitive user interfaces; Conduct usability testing', 'UX Designer', 'FULL_TIME', 5, 9),

       ('Almaty', '2023-07-08', '<p>We are seeking a skilled Data Analyst to analyze and interpret complex data sets.</p>
<p>Responsibilities:</p>
<ul>
  <li>Collect and analyze data</li>
  <li>Identify trends and patterns</li>
  <li>Prepare reports and visualizations</li>
</ul>', '1-3', 'Data analysis, SQL, Data visualization tools', 3500, 'Junior', 'Bachelor',
        'Strong analytical skills; Attention to detail',
        'Conduct data analysis; Present findings to stakeholders', 'Data Analyst', 'FULL_TIME', 2, 10),
       ('Almaty', '2023-07-08', '<p>We are looking for a talented Software Engineer to join our team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Design and develop software applications</li>
  <li>Collaborate with cross-functional teams to deliver high-quality solutions</li>
  <li>Write clean, maintainable, and efficient code</li>
</ul>', '3-6', 'Java, Spring, SQL', 8000, 'Senior', 'Bachelor',
        'Strong problem-solving skills; Good understanding of software development principles',
        'Develop and maintain software applications; Collaborate with team members on project requirements',
        'Senior Software Engineer', 'FULL_TIME', 2, 1),

       ('Astana', '2023-07-08', '<p>We are seeking a talented Marketing Manager to lead our marketing efforts.</p>
<p>Responsibilities:</p>
<ul>
  <li>Develop and execute marketing strategies to increase brand awareness</li>
  <li>Create compelling content for various marketing channels</li>
  <li>Analyze market trends and competitors</li>
</ul>', '3-6', 'Digital marketing, Content creation, Market analysis', 6000, 'Senior', 'Bachelor',
        'Excellent communication and presentation skills; Strong analytical mindset',
        'Plan and implement marketing campaigns; Analyze campaign performance and make data-driven decisions',
        'Marketing Manager', 'FULL_TIME', 3, 2),

       ('Shymkent', '2023-07-08', '<p>We are looking for a skilled Financial Analyst to join our finance team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Analyze financial data and provide insights for business decision-making</li>
  <li>Prepare financial reports and forecasts</li>
  <li>Identify cost-saving opportunities and optimize financial processes</li>
</ul>', '1-3', 'Financial analysis, Budgeting, Forecasting', 5000, 'Middle', 'Bachelor',
        'Strong analytical and problem-solving skills; Proficiency in financial modeling and Excel',
        'Conduct financial analysis; Prepare reports and forecasts; Identify areas for cost optimization',
        'Financial Analyst', 'FULL_TIME', 1, 3),

       ('Aktau', '2023-07-08', '<p>We are seeking a talented UX/UI Designer to create amazing user experiences.</p>
<p>Responsibilities:</p>
<ul>
  <li>Create user-centered designs and wireframes</li>
  <li>Collaborate with cross-functional teams to gather requirements</li>
  <li>Conduct user research and usability testing</li>
</ul>', '1-3', 'User experience design, User interface design, Prototyping', 4500, 'Junior', 'Bachelor',
        'Proficiency in design tools (Sketch, Adobe XD, Figma); Strong understanding of user-centered design principles',
        'Design user interfaces and interactions; Conduct user research and usability testing',
        'UX/UI Designer', 'FULL_TIME', 5, 4),

       ('Atyrau', '2023-07-08', '<p>We are looking for a talented Sales Executive to join our sales team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Identify new business opportunities and generate leads</li>
  <li>Nurture and maintain relationships with existing clients</li>
  <li>Prepare and present sales proposals</li>
</ul>', '1-3', 'Sales, Business development, Client relationship management', 4000, 'Junior', 'Bachelor',
        'Excellent communication and negotiation skills; Goal-oriented and self-motivated',
        'Generate leads and acquire new customers; Manage and grow relationships with existing clients',
        'Sales Executive', 'FULL_TIME', 6, 5),

       ('Almaty', '2023-07-08', '<p>We are seeking a skilled HR Manager to lead our HR department.</p>
<p>Responsibilities:</p>
<ul>
  <li>Develop and implement HR strategies and policies</li>
  <li>Manage recruitment and onboarding processes</li>
  <li>Provide guidance and support to employees on HR-related matters</li>
</ul>', '3-6', 'Human resources management, Recruitment, Employee relations', 7000, 'Senior', 'Bachelor',
        'Strong knowledge of labor laws and HR best practices; Excellent leadership and communication skills',
        'Develop and implement HR policies and procedures; Manage recruitment and employee relations',
        'HR Manager', 'FULL_TIME', 8, 6),

       ('Astana', '2023-07-08', '<p>We are looking for a talented Data Scientist to join our data analytics team.</p>
<p>Responsibilities:</p>
<ul>
  <li>Collect, analyze, and interpret large datasets</li>
  <li>Develop and implement machine learning models</li>
  <li>Present insights and recommendations to stakeholders</li>
</ul>', '3-6', 'Data analysis, Machine learning, Python, R', 8000, 'Senior', 'Master',
        'Strong analytical and problem-solving skills; Proficiency in data visualization tools',
        'Analyze data and build predictive models; Communicate insights to stakeholders',
        'Data Scientist', 'FULL_TIME', 2, 7),

       ('Shymkent', '2023-07-08', '<p>We are seeking a talented UI/UX Designer to create visually appealing user interfaces.</p>
<p>Responsibilities:</p>
<ul>
  <li>Create wireframes, mockups, and prototypes</li>
  <li>Collaborate with developers to implement designs</li>
  <li>Conduct user testing and gather feedback</li>
</ul>', '1-3', 'User interface design, Wireframing, Prototyping', 4000, 'Junior', 'Bachelor',
        'Proficiency in design tools (Sketch, Adobe XD, Figma); Knowledge of usability principles',
        'Design user interfaces and interactions; Collaborate with development team to implement designs',
        'UI/UX Designer', 'FULL_TIME', 5, 8),

       ('Aktau', '2023-07-08', '<p>We are looking for a skilled Project Manager to oversee our projects.</p>
<p>Responsibilities:</p>
<ul>
  <li>Plan and execute project activities</li>
  <li>Coordinate resources and stakeholders</li>
  <li>Monitor project progress and ensure timely delivery</li>
</ul>', '3-6', 'Project management, Stakeholder coordination, Risk management', 6000, 'Middle', 'Bachelor',
        'Strong organizational and leadership skills; Ability to manage multiple projects simultaneously',
        'Manage project activities and timelines; Ensure project deliverables are met',
        'Project Manager', 'FULL_TIME', 7, 9);

--changeset akhulbay:6
INSERT INTO t_blog (content, created_at, image, title, blog_category_id, user_id)
VALUES ('<p>Discover the latest technological advancements that are shaping our world and transforming industries. From artificial intelligence and machine learning to blockchain and quantum computing, explore how these innovations are revolutionizing various sectors and improving our daily lives.</p>',
        '2023-07-08', 'img-1.jpg', 'Latest Technological Advancements', 1, 1),

       ('<p>Learn about healthy eating habits and practical tips to maintain a balanced lifestyle. Discover the benefits of incorporating nutrient-rich foods into your diet, the importance of portion control, and how to make informed choices when it comes to meal planning. Empower yourself to prioritize your well-being through mindful and wholesome eating.</p>',
        '2023-07-08', 'img-2.jpg', 'Healthy Eating Habits for a Balanced Lifestyle', 2, 1),

       ('<p>Embark on a journey to explore off-the-beaten-path destinations and uncover hidden gems with unique cultural experiences. From secluded beaches and charming villages to remote hiking trails and cultural landmarks, these lesser-known places offer an opportunity to immerse yourself in authentic local traditions and create unforgettable memories.</p>',
        '2023-07-08', 'img-3.jpg', 'Exploring Hidden Gems: Off-the-Beaten-Path Destinations', 3, 1),

       ('<p>Indulge in a culinary adventure with delicious recipes from around the world. From exotic spices and aromatic flavors to innovative cooking techniques and traditional favorites, explore a diverse range of dishes that will tantalize your taste buds and inspire your culinary creativity. Elevate your home cooking with these mouthwatering recipes.</p>',
        '2023-07-08', 'img-4.jpg', 'Delicious Recipes from Around the World', 4, 1),

       ('<p>Stay stylish and up to date with the latest fashion trends, styling tips, and outfit inspiration. From seasonal wardrobe essentials and fashion-forward accessories to expert advice on creating stylish ensembles, discover how to express your unique personality through fashion and make a statement wherever you go.</p>',
        '2023-07-08', 'img-5.jpg', 'Fashion Trends: Stay Stylish with the Latest Looks', 5, 1),

       ('<p>Get the latest sports news, highlights, analysis, and inspiring stories of athletes. Stay informed about major sporting events, championship victories, record-breaking performances, and inspiring comebacks. Dive into the world of sports and celebrate the dedication, perseverance, and triumphs of athletes from around the globe.</p>',
        '2023-07-08', 'img-6.jpg', 'Sports News: Highlights, Analysis, and Player Spotlights', 6, 1),

       ('<p>Gain valuable insights from successful entrepreneurs and learn about business strategies that drive success. From industry trends and startup stories to leadership tips and innovative ideas, explore the world of entrepreneurship and discover how to navigate challenges, seize opportunities, and build a thriving business.</p>',
        '2023-07-08', 'img-7.jpg', 'Entrepreneurial Insights: Success Stories and Business Strategies', 7, 1);

