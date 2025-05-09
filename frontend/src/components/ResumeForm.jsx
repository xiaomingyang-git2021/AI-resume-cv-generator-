import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResumeForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      profile: "",
    },
    education: [
      {
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ],
    experience: [
      {
        company: "",
        location: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    projects: [
      {
        title: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    extracurricular: {
      activities: "",
      leadership: "",
    },
    skills: [],
  });

  // 添加这个 useEffect
  useEffect(() => {
    const savedData = localStorage.getItem("resumeFormData"); // 改成 resumeFormData

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // 直接设置解析后的数据，因为它已经有正确的结构
        setFormData({
          personalInfo: parsedData.personalInfo,
          education: parsedData.education,
          experience: parsedData.experience,
          projects: parsedData.projects,
          extracurricular: parsedData.extracurricular,
          skills: parsedData.skills,
        });
      } catch (error) {
        console.error("Error loading form data:", error);
      }
    }
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (first, second, third, fourth) => {
    // 如果是事件对象 (用于个人信息)
    if (first && first.target) {
      const { name, value } = first.target;
      setFormData((prevData) => {
        const newData = { ...prevData };
        if (name.includes(".")) {
          const [section, field] = name.split(".");
          if (section === "personalInfo") {
            newData.personalInfo = {
              ...newData.personalInfo,
              [field]: value,
            };
          }
        }
        return newData;
      });
    }
    // 如果是直接传入的参数
    else {
      const section = first;
      const field = second;
      const value = fourth; // 使用 fourth 因为它包含实际的值

      setFormData((prevData) => {
        const newData = { ...prevData };

        if (section === "skills") {
          // 处理 skills
          newData.skills = value
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "");
        } else if (section === "extracurricular") {
          // 处理 activities 和 leadership
          newData.extracurricular = {
            ...prevData.extracurricular,
            [field]: value,
          };
        } else if (
          section === "education" ||
          section === "experience" ||
          section === "projects"
        ) {
          // 处理数组类型的字段
          const index = second;
          newData[section] = [...prevData[section]];
          newData[section][index] = {
            ...prevData[section][index],
            [third]: value,
          };
        }

        return newData;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate only required personal information
    if (!formData.personalInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.personalInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.personalInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    console.log("Validation errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Current form data:", JSON.stringify(formData, null, 2));

    if (validateForm()) {
      console.log("Form validation passed");
      // 在保存之前确保所有数据都是最新的
      const dataToSave = {
        personalInfo: { ...formData.personalInfo },
        education: formData.education.map((edu) => ({ ...edu })),
        experience: formData.experience.map((exp) => ({ ...exp })),
        projects: formData.projects.map((proj) => ({ ...proj })),
        extracurricular: { ...formData.extracurricular },
        skills: [...formData.skills],
      };

      console.log(
        "Form data before saving:",
        JSON.stringify(formData, null, 2)
      );
      console.log(
        "Education data to save:",
        JSON.stringify(dataToSave.education, null, 2)
      );
      console.log(
        "Experience data to save:",
        JSON.stringify(dataToSave.experience, null, 2)
      );
      console.log(
        "Projects data to save:",
        JSON.stringify(dataToSave.projects, null, 2)
      );
      console.log("Data to be saved:", JSON.stringify(dataToSave, null, 2));

      try {
        // Store form data in localStorage for persistence
        localStorage.setItem("resumeFormData", JSON.stringify(dataToSave));
        console.log(
          "Data saved to localStorage successfully:",
          JSON.stringify(dataToSave, null, 2)
        );

        // Navigate to the next step (preview page)
        navigate("/preview-resume");
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-3 py-4 sm:px-6 sm:py-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {t("create_your_resume")}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-6 sm:space-y-8"
            >
              {/* Personal Information Section */}
              {/* <div className="space-y-3 sm:space-y-4">
                <h4 className="text-md font-medium text-gray-700 text-left">
                  Personal Information
                </h4>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) =>
                      handleChange(
                        "personalInfo",
                        0,
                        "fullName",
                        e.target.value
                      )
                    }
                    className={`mt-1 block w-full border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        handleChange("personalInfo", 0, "email", e.target.value)
                      }
                      className={`mt-1 block w-full border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.personalInfo.phone}
                      onChange={(e) =>
                        handleChange("personalInfo", 0, "phone", e.target.value)
                      }
                      className={`mt-1 block w-full border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div> */}

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {t("personal_info")}
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 text-left ml-0">
                      {t("full_name")} *
                    </label>
                    <input
                      type="text"
                      name="personalInfo.fullName"
                      value={formData.personalInfo.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  {/* 对其他输入字段使用相同的结构 */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 text-left ml-0">
                      {t("job_title")} *
                    </label>
                    <select
                      name="personalInfo.jobTitle"
                      value={formData.personalInfo.jobTitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">{t("select_job_title")}</option>
                      <option value="Full Stack Engineer">
                        {t("full_stack_engineer")}
                      </option>
                      <option value="Software Developer">
                        {t("software_developer")}
                      </option>
                      <option value="Marketing Manager">
                        {t("marketing_manager")}
                      </option>
                      <option value="Project Manager">
                        {t("project_manager")}
                      </option>
                      <option value="Data Analyst">{t("data_analyst")}</option>
                      <option value="Graphic Designer">
                        {t("graphic_designer")}
                      </option>
                      <option value="Sales Representative">
                        {t("sales_representative")}
                      </option>
                      <option value="Business Analyst">
                        {t("business_analyst")}
                      </option>
                      <option value="Financial Analyst">
                        {t("financial_analyst")}
                      </option>
                      <option value="Product Manager">
                        {t("product_manager")}
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 text-left ml-0">
                      {t("email")} *
                    </label>
                    <input
                      type="email"
                      name="personalInfo.email"
                      value={formData.personalInfo.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 text-left ml-0">
                      {t("phone")} *
                    </label>
                    <input
                      type="tel"
                      name="personalInfo.phone"
                      value={formData.personalInfo.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 text-left ml-0">
                      {t("profile")}
                    </label>
                    <textarea
                      name="personalInfo.profile"
                      value={formData.personalInfo.profile}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows="4"
                      placeholder={t("write_brief_summary")}
                    />
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-md font-medium text-gray-700 text-left">
                  {t("education")}
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor="school"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      {t("school")}
                    </label>
                    <input
                      type="text"
                      name="school"
                      id="school"
                      placeholder="Any school, university, or coding bootcamp"
                      value={formData.education[0].school}
                      onChange={(e) =>
                        handleChange("education", 0, "school", e.target.value)
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="degree"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("degree")}
                      </label>
                      <input
                        type="text"
                        name="degree"
                        id="degree"
                        value={formData.education[0].degree}
                        onChange={(e) =>
                          handleChange("education", 0, "degree", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="field"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("field_of_study")}
                      </label>
                      <input
                        type="text"
                        name="field"
                        id="field"
                        value={formData.education[0].field}
                        onChange={(e) =>
                          handleChange("education", 0, "field", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("start_date")}
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={formData.education[0].startDate}
                        onChange={(e) =>
                          handleChange(
                            "education",
                            0,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("end_date")}
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={formData.education[0].endDate}
                        onChange={(e) =>
                          handleChange(
                            "education",
                            0,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Experience Section */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-md font-medium text-gray-700 text-left">
                  {t("professional_experience")}
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      {t("company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.experience[0].company}
                      onChange={(e) =>
                        handleChange("experience", 0, "company", e.target.value)
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      {t("role")}
                    </label>
                    <input
                      type="text"
                      name="position"
                      id="position"
                      value={formData.experience[0].position}
                      onChange={(e) =>
                        handleChange(
                          "experience",
                          0,
                          "position",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("start_date")}
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={formData.experience[0].startDate}
                        onChange={(e) =>
                          handleChange(
                            "experience",
                            0,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("end_date")}
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={formData.experience[0].endDate}
                        onChange={(e) =>
                          handleChange(
                            "experience",
                            0,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects & Extracurricular Section */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-md font-medium text-gray-700 text-left">
                  {t("projects_and_extracurricular")}
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <label
                      htmlFor="projectTitle"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      {t("project_title")}
                    </label>
                    <input
                      type="text"
                      name="projectTitle"
                      id="projectTitle"
                      value={formData.projects[0].title}
                      onChange={(e) =>
                        handleChange("projects", 0, "title", e.target.value)
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="projectStartDate"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("start_date")}
                      </label>
                      <input
                        type="date"
                        name="projectStartDate"
                        id="projectStartDate"
                        value={formData.projects[0].startDate}
                        onChange={(e) =>
                          handleChange(
                            "projects",
                            0,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="projectEndDate"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        {t("end_date")}
                      </label>
                      <input
                        type="date"
                        name="projectEndDate"
                        id="projectEndDate"
                        value={formData.projects[0].endDate}
                        onChange={(e) =>
                          handleChange("projects", 0, "endDate", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="activities"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      {t("activities")}
                    </label>
                    <textarea
                      name="activities"
                      id="activities"
                      rows={2}
                      value={formData.extracurricular.activities}
                      onChange={(e) =>
                        handleChange(
                          "extracurricular",
                          "activities",
                          "activities",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="leadership"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      {t("leadership_experience")}
                    </label>
                    <textarea
                      name="leadership"
                      id="leadership"
                      rows={2}
                      value={formData.extracurricular.leadership}
                      onChange={(e) =>
                        handleChange(
                          "extracurricular",
                          "leadership",
                          "leadership",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-md font-medium text-gray-700 text-left">
                  {t("skills")}
                </h4>
                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    {t("skills_comma_separated")}
                  </label>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    value={formData.skills.join(", ")}
                    onChange={(e) =>
                      handleChange("skills", 0, "skills", e.target.value)
                    }
                    placeholder="e.g. JavaScript, React, Python"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t("next")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
