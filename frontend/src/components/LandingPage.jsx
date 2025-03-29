import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom"; // 确保在文件顶部添加这个导入
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    // 可以后续添加更多语言
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
  };

  const navigate = useNavigate();

  const handleResumeClick = () => {
    navigate("/create-resume");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 语言切换器 - 添加在最上面 */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <BiWorld className="w-6 h-6 text-gray-300" />
          </button>

          {/* 语言选择菜单 */}
          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-50 hover:text-blue-600"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t("ai_resume_generator")}
          </h1>
          <p className="text-xl text-gray-600">{t("main_description")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Resume Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-8 flex flex-col h-full">
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("create_resume")}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                {t("resume_description")}
              </p>
              <button
                onClick={handleResumeClick}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                {t("start_building_resume")}
              </button>
            </div>
          </div>

          {/* Cover Letter Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-8 flex flex-col h-full">
              <div className="text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("create_cover_letter")}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                {t("cover_letter_description")}
              </p>
              <Link
                to="/create-cover-letter"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 block text-center"
              >
                {t("start_writing_cover_letter")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
