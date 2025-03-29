import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useTranslation } from "react-i18next";

const PreviewResume = () => {
  const { t } = useTranslation(); // 添加这行
  const navigate = useNavigate();
  const resumeRef = useRef(null); // 添加这行来定义 resumeRef
  const [formData, setFormData] = useState(null);

  const handleGenerateResume = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 1,
      filename: "my_resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    // 从 localStorage 获取表单数据
    const savedData = localStorage.getItem("resumeFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log(
          "Loaded data from localStorage:",
          JSON.stringify(parsedData, null, 2)
        );
        console.log(
          "Education data:",
          JSON.stringify(parsedData.education, null, 2)
        );
        console.log(
          "Experience data:",
          JSON.stringify(parsedData.experience, null, 2)
        );
        console.log(
          "Projects data:",
          JSON.stringify(parsedData.projects, null, 2)
        );
        if (parsedData.education && parsedData.education.length > 0) {
          console.log(
            "First education entry:",
            JSON.stringify(parsedData.education[0], null, 2)
          );
          console.log("School name:", parsedData.education[0].school);
        }
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
        navigate("/create-resume");
      }
    } else {
      console.log("No data found in localStorage");
      navigate("/create-resume");
    }
  }, [navigate]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  console.log("Current formData state:", JSON.stringify(formData, null, 2));
  console.log(
    "Education in render:",
    JSON.stringify(formData.education, null, 2)
  );
  if (formData.education && formData.education.length > 0) {
    console.log(
      "First education entry in render:",
      JSON.stringify(formData.education[0], null, 2)
    );
    console.log("School name in render:", formData.education[0].school);
  }
  console.log(
    "Experience in render:",
    JSON.stringify(formData.experience, null, 2)
  );
  console.log(
    "Projects in render:",
    JSON.stringify(formData.projects, null, 2)
  );

  //  return (
  //   <div className="min-h-screen bg-gray-50 py-12">
  //     <div className="max-w-4xl mx-auto px-4">
  //       <div className="bg-white rounded-lg shadow-lg p-8">
  //         {/* Header */}
  //         <div className="text-center mb-8">
  //           <h1 className="text-3xl font-bold text-gray-800 mb-2">
  //             {formData.personalInfo?.fullName || "Not provided"}
  //           </h1>
  //           <div className="text-gray-600">
  //             <p>{formData.personalInfo?.email || "Not provided"}</p>
  //             <p>{formData.personalInfo?.phone || "Not provided"}</p>
  //           </div>
  //         </div>

  //         {/* Education */}
  //         {console.log("Rendering education section")}
  //         {console.log("Education array:", formData.education)}
  //         {console.log("Education array length:", formData.education?.length)}
  //         {formData.education && formData.education.length > 0 && (
  //           <div className="mb-8">
  //             <h4 className="text-md font-medium text-gray-700 mb-4">
  //               Education
  //             </h4>
  //             {formData.education.map((edu, index) => {
  //               console.log("Rendering education entry:", index, edu);
  //               return (
  //                 <div key={index} className="space-y-2 mb-4">
  //                   {console.log("School value:", edu.school)}
  //                   {edu.school && (
  //                     <p className="text-gray-600 text-base font-medium">
  //                       {edu.school}
  //                     </p>
  //                   )}
  //                   {(edu.degree || edu.field) && (
  //                     <p className="text-sm text-gray-600">
  //                       {edu.degree} {edu.field && `in ${edu.field}`}
  //                     </p>
  //                   )}
  //                   {(edu.startDate || edu.endDate) && (
  //                     <p className="text-sm text-gray-500">
  //                       {edu.startDate} - {edu.endDate}
  //                     </p>
  //                   )}
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         )}

  //         {/* Professional Experience */}
  //         {formData.experience && formData.experience.length > 0 && (
  //           <div className="mb-8">
  //             <h4 className="text-md font-medium text-gray-700 mb-4">
  //               Professional Experience
  //             </h4>
  //             {formData.experience.map((exp, index) => (
  //               <div key={index} className="space-y-2 mb-4">
  //                 {exp.company && (
  //                   <p className="text-gray-600 text-base font-medium">
  //                     {exp.company}
  //                   </p>
  //                 )}
  //                 {exp.position && (
  //                   <p className="text-sm text-gray-600">{exp.position}</p>
  //                 )}
  //                 {(exp.startDate || exp.endDate) && (
  //                   <p className="text-sm text-gray-500">
  //                     {exp.startDate} - {exp.endDate}
  //                   </p>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         )}

  //         {/* Projects */}
  //         {formData.projects && formData.projects.length > 0 && (
  //           <div className="mb-8">
  //             <h4 className="text-md font-medium text-gray-700 mb-4">
  //               Projects
  //             </h4>
  //             {formData.projects.map((project, index) => (
  //               <div key={index} className="space-y-2 mb-4">
  //                 {project.title && (
  //                   <p className="text-gray-600 text-base font-medium">
  //                     {project.title}
  //                   </p>
  //                 )}
  //                 {(project.startDate || project.endDate) && (
  //                   <p className="text-sm text-gray-500">
  //                     {project.startDate} - {project.endDate}
  //                   </p>
  //                 )}
  //                 {project.description && (
  //                   <p className="text-sm text-gray-600">
  //                     {project.description}
  //                   </p>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         )}

  //         {/* Skills */}
  //         {formData.skills && formData.skills.length > 0 && (
  //           <div className="mb-8">
  //             <h4 className="text-md font-medium text-gray-700 mb-4">Skills</h4>
  //             <div className="flex flex-wrap gap-2">
  //               {formData.skills.map((skill, index) => (
  //                 <span
  //                   key={index}
  //                   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
  //                 >
  //                   {skill}
  //                 </span>
  //               ))}
  //             </div>
  //           </div>
  //         )}

  //         {/* Action Buttons */}
  //         <div className="flex justify-end space-x-4 pt-6">
  //           <button
  //             onClick={() => navigate("/create-resume")}
  //             className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //           >
  //             Back
  //           </button>
  //           <button
  //             onClick={() => {
  //               // TODO: Implement resume generation
  //               console.log("Generating resume...");
  //             }}
  //             className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //           >
  //             Generate Resume
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div ref={resumeRef} className="bg-white rounded-lg shadow-lg p-8">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column (1/3 width) */}
            <div className="col-span-1 space-y-6">
              {/* Full Name */}
              <div className="text-3xl font-bold text-gray-900">
                {formData.personalInfo?.fullName || "Not provided"}
              </div>

              {/* Job Title (will be added to form later) */}
              <div className="text-lg text-gray-700">
                {" "}
                {/* 从 text-xl 改为 text-lg */}
                {formData.personalInfo?.jobTitle || "Position"}
              </div>

              {/* Contact Info Box */}
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {t("contact")}
                </h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-700">{t("email")}: </h3>
                    <p className="text-gray-600">
                      {formData.personalInfo?.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700">{t("phone")}: </h3>
                    <p className="text-gray-600">
                      {formData.personalInfo?.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Section (will be added to form later) */}
              <div className="w-full">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {t("profile")}
                </h2>
                <div className="w-full overflow-hidden">
                  <p className="text-gray-600 whitespace-pre-wrap break-words max-w-full pr-2 text-left">
                    {formData.personalInfo?.profile ||
                      "Profile description will be added here"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (2/3 width) */}
            <div className="col-span-2 space-y-6">
              {/* Education Section */}
              {formData.education && formData.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
                    {t("education")}
                  </h2>
                  {formData.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {t("school")}: {edu.school}
                        </h3>
                        <span className="text-gray-600 font-medium">
                          {t("start_date")}: {edu.startDate} - {t("end_date")}:{" "}
                          {edu.endDate}
                        </span>
                      </div>
                      <div className="text-lg text-gray-700 font-medium mt-1 text-left">
                        {t("degree")}: {edu.degree} {t("field_of_study")}:{" "}
                        {edu.field && `in ${edu.field}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Professional Experience Section */}
              {formData.experience && formData.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
                    {t("professional_experience")}
                  </h2>
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {t("company")}: {exp.company}
                        </h3>
                        <span className="text-gray-600 font-medium">
                          {t("start_date")}: {exp.startDate} - {t("end_date")}:{" "}
                          {exp.endDate}
                        </span>
                      </div>
                      <div className="text-lg text-gray-700 font-medium mt-1 text-left">
                        {t("role")}: {exp.position}{" "}
                        {exp.location && `• ${exp.location}`}
                      </div>
                      {exp.description && (
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                          {exp.description.split("\n").map(
                            (bullet, i) =>
                              bullet.trim() && (
                                <li key={i} className="ml-4">
                                  {bullet.trim()}
                                </li>
                              )
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Section */}
              {formData.projects && formData.projects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
                    {t("projects_and_extracurricular")}
                  </h2>
                  {formData.projects.map((project, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {t("project_title")}: {project.title}
                        </h3>
                        <span className="text-gray-600 font-medium">
                          {t("start_date")}: {project.startDate} -{" "}
                          {t("end_date")}: {project.endDate}
                        </span>
                      </div>
                      {project.description && (
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                          {project.description.split("\n").map(
                            (bullet, i) =>
                              bullet.trim() && (
                                <li key={i} className="ml-4">
                                  {bullet.trim()}
                                </li>
                              )
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section */}
              {formData.skills && formData.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
                    {t("skills")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-base"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => navigate("/create-resume")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            {t("back_to_edit")}
          </button>
          <button
            onClick={() => navigate("/create-cover-letter")}
            className="px-4 py-2 border border-blue-500 rounded text-blue-600 hover:bg-blue-50"
          >
            {t("create_cover_letter")}
          </button>
          <button
            onClick={handleGenerateResume}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t("generate_pdf")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewResume;
