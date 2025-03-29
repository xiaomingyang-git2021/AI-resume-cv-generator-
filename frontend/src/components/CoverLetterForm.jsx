import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CoverLetterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 从 localStorage 获取个人信息
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // 求职信特定信息
  const [coverLetterData, setCoverLetterData] = useState({
    companyName: "",
    hiringManager: "",
    companyAddress: "",
    jobTitle: "",
    jobSource: "",
  });

  // 从简历表单获取个人信息
  useEffect(() => {
    const savedData = localStorage.getItem("resumeFormData"); // 改成 resumeFormData
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setPersonalInfo({
        fullName: parsedData.personalInfo.fullName || "", // 加上 personalInfo
        email: parsedData.personalInfo.email || "", // 加上 personalInfo
        phone: parsedData.personalInfo.phone || "", // 加上 personalInfo
      });
    }

    // 在这里添加新代码
    const savedCoverLetterData = localStorage.getItem("coverLetterData");
    if (savedCoverLetterData) {
      try {
        const parsedCoverLetterData = JSON.parse(savedCoverLetterData);
        setCoverLetterData({
          companyName: parsedCoverLetterData.companyName || "",
          hiringManager: parsedCoverLetterData.hiringManager || "",
          companyAddress: parsedCoverLetterData.companyAddress || "",
          jobTitle: parsedCoverLetterData.jobTitle || "",
          jobSource: parsedCoverLetterData.jobSource || "",
        });
      } catch (error) {
        console.error("Error loading cover letter data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoverLetterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 合并个人信息和求职信数据
    const completeData = {
      ...personalInfo,
      ...coverLetterData,
      date: new Date().toLocaleDateString(),
    };

    console.log("Saving cover letter data:", completeData); // 添加这行

    // 保存到 localStorage
    localStorage.setItem("coverLetterData", JSON.stringify(completeData));

    // 导航到预览页面
    navigate("/preview-cover-letter");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{t("create_cover_letter")}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 个人信息显示区域 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            {t("personal_info")}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {t("full_name")}: {personalInfo.fullName}
              </p>
              <p className="text-sm text-gray-700">
                {t("email")}: {personalInfo.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                {t("phone")}: {personalInfo.phone}
              </p>
            </div>
          </div>
        </div>

        {/* 公司信息 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("company_name")}
            </label>
            <input
              type="text"
              name="companyName"
              value={coverLetterData.companyName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("hiring_manager")}
            </label>
            <input
              type="text"
              name="hiringManager"
              value={coverLetterData.hiringManager}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={t("optional")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("company_address")}
            </label>
            <input
              type="text"
              name="companyAddress"
              value={coverLetterData.companyAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("job_title")}
            </label>
            <input
              type="text"
              name="jobTitle"
              value={coverLetterData.jobTitle}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("job_source")}
            </label>
            <input
              type="text"
              name="jobSource"
              value={coverLetterData.jobSource}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-300 rounded text-white hover:bg-gray-50 hover:text-gray-900"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t("preview_cover_letter")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoverLetterForm;
