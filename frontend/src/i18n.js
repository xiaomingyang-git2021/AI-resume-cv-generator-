import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // 保持原有的英文内容
      ai_resume_generator: "AI Resume / CV Generator",
      main_description:
        "Quickly Create Professional Resumes / CV - Start Your Path to Career Success",
      create_resume: "Create Resume",
      create_your_resume: "Create Your Resume",
      resume_description:
        "Generate a professional resume that highlights your skills and experience with our AI-powered builder.",
      create_cover_letter: "Create Cover Letter",
      cover_letter_description:
        "Craft a compelling cover letter that matches your resume and impresses potential employers.",
      get_started: "Get Started",
      start_building_resume: "Start Building Resume",
      start_writing_cover_letter: "Start Writing Cover Letter",
      personal_info: "Personal Information",
      company_name: "Company Name",
      hiring_manager: "Hiring Manager",
      company_address: "Company Address",
      job_title: "Job Title",
      job_source: "Where did you find this job?",
      optional: "Optional",
      preview_cover_letter: "Preview Cover Letter",
      cancel: "Cancel",
      edit: "Edit",
      generate_pdf: "Generate PDF",

      // 个人信息
      full_name: "Full Name",
      email: "Email",
      phone: "Phone",
      contact: "Contact",
      profile: "Profile",

      // 简历表单
      education: "Education",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      next: "Next",
      back: "Back",
      back_to_edit: "Back to Edit",
      school: "School",
      degree: "Degree",
      field_of_study: "Field of Study",
      start_date: "Start Date",
      end_date: "End Date",
      professional_experience: "Professional Experience",
      company: "Company",
      role: "Role",
      projects_and_extracurricular: "Projects & Extracurricular",
      project_title: "Project Title",
      activities: "Activities",
      leadership_experience: "Leadership Experience",
      skills_comma_separated: "Skills (comma separated)",
      write_brief_summary: "Write a brief professional summary...", // 添加占位符文本的翻译
      select_job_title: "Select a job title",
      full_stack_engineer: "Full Stack Engineer",
      software_developer: "Software Developer",
      marketing_manager: "Marketing Manager",
      project_manager: "Project Manager",
      data_analyst: "Data Analyst",
      graphic_designer: "Graphic Designer",
      sales_representative: "Sales Representative",
      business_analyst: "Business Analyst",
      financial_analyst: "Financial Analyst",
      product_manager: "Product Manager",

      // // 求职信表单
      // hiring_manager: "Hiring Manager",
      // company_address: "Company Address",
      // job_title: "Job Title",
      // job_source: "Where did you find this job?",
      // preview_cover_letter: "Preview Cover Letter",

      // // 按钮和操作
      // edit: "Edit",
      // generate_pdf: "Generate PDF",
      // create_cover_letter: "Create Cover Letter",
    },
  },
  zh: {
    translation: {
      // 中文翻译
      ai_resume_generator: "AI 简历生成器",
      main_description: "快速制作专业简历求职信 - 开启职业成功路",
      create_resume: "创建简历",
      create_your_resume: "创建简历",
      resume_description:
        "使用我们的 AI 驱动生成器，创建一份突出展示您的技能和经验的专业简历。",
      create_cover_letter: "创建求职信",
      cover_letter_description:
        "制作一份与您的简历相匹配的求职信，给潜在雇主留下深刻印象。",
      get_started: "开始使用",
      start_building_resume: "开始制作简历",
      start_writing_cover_letter: "开始写求职信",
      personal_info: "个人信息",
      full_name: "姓名",
      email: "电子邮箱",
      phone: "电话",
      education: "教育背景",
      experience: "工作经验",
      projects: "项目经历",
      skills: "技能特长",
      next: "下一步",
      back: "返回",
      company_name: "公司名称",
      hiring_manager: "招聘经理",
      company_address: "公司地址",
      job_title: "职位名称",
      job_source: "职位信息来源",
      optional: "选填",
      preview_cover_letter: "预览求职信",
      cancel: "取消",
      edit: "编辑",
      generate_pdf: "生成PDF",
      back_to_edit: "返回编辑",
      school: "学校",
      degree: "学位",
      field_of_study: "专业",
      start_date: "开始日期",
      end_date: "结束日期",
      professional_experience: "工作经验",
      company: "公司",
      role: "职位",
      projects_and_extracurricular: "项目与课外活动",
      project_title: "项目名称",
      activities: "活动经历",
      leadership_experience: "领导经验",
      skills_comma_separated: "技能（用逗号分隔）",
      profile: "个人简介",
      write_brief_summary: "写一段简短的个人专业总结...",
      contact: "联系方式",
      select_job_title: "选择职位",
      full_stack_engineer: "全栈工程师",
      software_developer: "软件开发工程师",
      marketing_manager: "市场经理",
      project_manager: "项目经理",
      data_analyst: "数据分析师",
      graphic_designer: "平面设计师",
      sales_representative: "销售代表",
      business_analyst: "商业分析师",
      financial_analyst: "金融分析师",
      product_manager: "产品经理",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // 默认语言
  fallbackLng: "en", // 回退语言
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
