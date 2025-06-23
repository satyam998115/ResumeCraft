// Global variables
let educationCount = 0;
let experienceCount = 0;
let certificationCount = 0;
let achievementCount = 0;
let projectCount = 0;
let currentTemplate = 'professional';

let resumeData = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        website: ''
    },
    profileSummary: '',
    education: [],
    skills: [],
    experience: [],
    certifications: [],
    achievements: [],
    projects: [],
    template: 'professional'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    updateResume();
    updateProgress();
    
    // Add event listeners
    document.getElementById('skillInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });
});

// Save data to localStorage
function saveData() {
    resumeData.template = currentTemplate;
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
}

// Load data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
        try {
            resumeData = JSON.parse(savedData);
            currentTemplate = resumeData.template || 'professional';
            document.getElementById('templateSelect').value = currentTemplate;
            populateForm();
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Populate form with saved data
function populateForm() {
    // Personal info
    Object.keys(resumeData.personalInfo).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = resumeData.personalInfo[key];
        }
    });
    
    // Profile summary
    document.getElementById('profileSummary').value = resumeData.profileSummary;
    
    // Education
    resumeData.education.forEach(edu => {
        addEducation(edu);
    });
    
    // Skills
    resumeData.skills.forEach(skill => {
        addSkillTag(skill);
    });
    
    // Experience
    resumeData.experience.forEach(exp => {
        addExperience(exp);
    });
    
    // Certifications
    resumeData.certifications.forEach(cert => {
        addCertification(cert);
    });
    
    // Achievements
    resumeData.achievements.forEach(ach => {
        addAchievement(ach);
    });
    
    // Projects
    resumeData.projects.forEach(proj => {
        addProject(proj);
    });
}

// Update resume preview
function updateResume() {
    collectFormData();
    renderResume();
    updateProgress();
    saveData();
}

// Collect form data
function collectFormData() {
    // Personal info
    resumeData.personalInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        linkedin: document.getElementById('linkedin').value,
        website: document.getElementById('website').value
    };
    
    // Profile summary
    resumeData.profileSummary = document.getElementById('profileSummary').value;
    
    // Education
    resumeData.education = [];
    document.querySelectorAll('.education-item').forEach(item => {
        const edu = {
            institution: item.querySelector('.edu-institution').value,
            degree: item.querySelector('.edu-degree').value,
            startDate: item.querySelector('.edu-start').value,
            endDate: item.querySelector('.edu-end').value,
            gpa: item.querySelector('.edu-gpa').value
        };
        resumeData.education.push(edu);
    });
    
    // Experience
    resumeData.experience = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        const exp = {
            company: item.querySelector('.exp-company').value,
            position: item.querySelector('.exp-position').value,
            startDate: item.querySelector('.exp-start').value,
            endDate: item.querySelector('.exp-end').value,
            current: item.querySelector('.exp-current').checked,
            description: item.querySelector('.exp-description').value
        };
        resumeData.experience.push(exp);
    });
    
    // Certifications
    resumeData.certifications = [];
    document.querySelectorAll('.certification-item').forEach(item => {
        const cert = {
            name: item.querySelector('.cert-name').value,
            issuer: item.querySelector('.cert-issuer').value,
            date: item.querySelector('.cert-date').value,
            url: item.querySelector('.cert-url').value
        };
        resumeData.certifications.push(cert);
    });
    
    // Achievements
    resumeData.achievements = [];
    document.querySelectorAll('.achievement-item').forEach(item => {
        const ach = {
            title: item.querySelector('.ach-title').value,
            date: item.querySelector('.ach-date').value,
            description: item.querySelector('.ach-description').value
        };
        resumeData.achievements.push(ach);
    });
    
    // Projects
    resumeData.projects = [];
    document.querySelectorAll('.project-item').forEach(item => {
        const proj = {
            name: item.querySelector('.proj-name').value,
            technologies: item.querySelector('.proj-tech').value,
            description: item.querySelector('.proj-description').value,
            url: item.querySelector('.proj-url').value
        };
        resumeData.projects.push(proj);
    });
    
    // Skills (handled separately)
}

// Render resume preview
function renderResume() {
    const preview = document.getElementById('resumePreview');
    const hasContent = hasResumeContent();
    
    if (!hasContent) {
        preview.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📄</div>
                <h3>Resume Preview</h3>
                <p>Start filling out the form to see your resume come to life</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="${currentTemplate}">
    `;
    
    // Header
    if (resumeData.personalInfo.name || hasPersonalInfo()) {
        html += `
            <header class="resume-header">
                ${resumeData.personalInfo.name ? `<h1 class="resume-name">${resumeData.personalInfo.name}</h1>` : ''}
                <div class="resume-contact">
                    ${resumeData.personalInfo.email ? `<div class="contact-item">📧 ${resumeData.personalInfo.email}</div>` : ''}
                    ${resumeData.personalInfo.phone ? `<div class="contact-item">📞 ${resumeData.personalInfo.phone}</div>` : ''}
                    ${resumeData.personalInfo.address ? `<div class="contact-item">📍 ${resumeData.personalInfo.address}</div>` : ''}
                    ${resumeData.personalInfo.linkedin ? `<div class="contact-item">💼 <a href="${formatUrl(resumeData.personalInfo.linkedin)}" target="_blank">${cleanUrl(resumeData.personalInfo.linkedin)}</a></div>` : ''}
                    ${resumeData.personalInfo.website ? `<div class="contact-item">🌐 <a href="${formatUrl(resumeData.personalInfo.website)}" target="_blank">${cleanUrl(resumeData.personalInfo.website)}</a></div>` : ''}
                </div>
            </header>
        `;
    }
    
    // Profile Summary
    if (resumeData.profileSummary) {
        html += `
            <section class="resume-section">
                <h2>Professional Summary</h2>
                <p>${resumeData.profileSummary.replace(/\n/g, '<br>')}</p>
            </section>
        `;
    }
    
    // Experience
    if (resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.company || exp.position)) {
        html += `
            <section class="resume-section">
                <h2>Professional Experience</h2>
                ${resumeData.experience.map(exp => {
                    if (!exp.company && !exp.position) return '';
                    return `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    ${exp.position ? `<div class="resume-item-title">${exp.position}</div>` : ''}
                                    ${exp.company ? `<div class="resume-item-subtitle">${exp.company}</div>` : ''}
                                </div>
                                ${exp.startDate || exp.endDate ? `<div class="resume-item-date">📅 ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>` : ''}
                            </div>
                            ${exp.description ? `<div class="resume-item-description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </section>
        `;
    }
    
    // Projects
    if (resumeData.projects.length > 0 && resumeData.projects.some(proj => proj.name)) {
        html += `
            <section class="resume-section">
                <h2>Projects</h2>
                ${resumeData.projects.map(proj => {
                    if (!proj.name) return '';
                    return `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    ${proj.name ? `<div class="resume-item-title">${proj.name}</div>` : ''}
                                    ${proj.technologies ? `<div class="resume-item-subtitle">${proj.technologies}</div>` : ''}
                                </div>
                                ${proj.url ? `<div class="resume-item-date"><a href="${formatUrl(proj.url)}" target="_blank">View Project</a></div>` : ''}
                            </div>
                            ${proj.description ? `<div class="resume-item-description">${proj.description.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </section>
        `;
    }
    
    // Education
    if (resumeData.education.length > 0 && resumeData.education.some(edu => edu.institution || edu.degree)) {
        html += `
            <section class="resume-section">
                <h2>Education</h2>
                ${resumeData.education.map(edu => {
                    if (!edu.institution && !edu.degree) return '';
                    return `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    ${edu.degree ? `<div class="resume-item-title">${edu.degree}</div>` : ''}
                                    ${edu.institution ? `<div class="resume-item-subtitle">${edu.institution}</div>` : ''}
                                    ${edu.gpa ? `<div style="font-size: 0.875rem; color: var(--text-light);">GPA: ${edu.gpa}</div>` : ''}
                                </div>
                                ${edu.startDate || edu.endDate ? `<div class="resume-item-date">📅 ${edu.startDate} - ${edu.endDate}</div>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </section>
        `;
    }
    
    // Certifications
    if (resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name)) {
        html += `
            <section class="resume-section">
                <h2>Certifications</h2>
                ${resumeData.certifications.map(cert => {
                    if (!cert.name) return '';
                    return `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    ${cert.name ? `<div class="resume-item-title">${cert.name}</div>` : ''}
                                    ${cert.issuer ? `<div class="resume-item-subtitle">${cert.issuer}</div>` : ''}
                                </div>
                                ${cert.date ? `<div class="resume-item-date">📅 ${cert.date}</div>` : ''}
                            </div>
                            ${cert.url ? `<div class="resume-item-description"><a href="${formatUrl(cert.url)}" target="_blank">View Credential</a></div>` : ''}
                        </div>
                    `;
                }).join('')}
            </section>
        `;
    }
    
    // Achievements
    if (resumeData.achievements.length > 0 && resumeData.achievements.some(ach => ach.title)) {
        html += `
            <section class="resume-section">
                <h2>Achievements</h2>
                ${resumeData.achievements.map(ach => {
                    if (!ach.title) return '';
                    return `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    ${ach.title ? `<div class="resume-item-title">${ach.title}</div>` : ''}
                                </div>
                                ${ach.date ? `<div class="resume-item-date">📅 ${ach.date}</div>` : ''}
                            </div>
                            ${ach.description ? `<div class="resume-item-description">${ach.description.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </section>
        `;
    }
    
    // Skills
    if (resumeData.skills.length > 0) {
        html += `
            <section class="resume-section">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${resumeData.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </section>
        `;
    }
    
    html += `</div>`; // Close template div
    
    preview.innerHTML = html;
}

// Helper functions
function hasResumeContent() {
    return hasPersonalInfo() || 
           resumeData.profileSummary || 
           resumeData.education.length > 0 || 
           resumeData.skills.length > 0 || 
           resumeData.experience.length > 0 ||
           resumeData.certifications.length > 0 ||
           resumeData.achievements.length > 0 ||
           resumeData.projects.length > 0;
}

function hasPersonalInfo() {
    return Object.values(resumeData.personalInfo).some(value => value.trim() !== '');
}

function formatUrl(url) {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
}

function cleanUrl(url) {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

// Add education entry
function addEducation(data = null) {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const div = document.createElement('div');
    div.className = 'education-item';
    div.innerHTML = `
        <div class="item-header">
            <span class="item-title">Education Entry #${educationCount}</span>
            <button type="button" class="remove-btn" onclick="removeEducation(this)">×</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="edu-institution" placeholder="University Name" value="${data ? data.institution : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" placeholder="Bachelor of Science" value="${data ? data.degree : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" class="edu-start" placeholder="Sep 2018" value="${data ? data.startDate : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="text" class="edu-end" placeholder="May 2022" value="${data ? data.endDate : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>GPA (Optional)</label>
                <input type="text" class="edu-gpa" placeholder="3.8" value="${data ? data.gpa : ''}" oninput="updateResume()">
            </div>
        </div>
    `;
    container.appendChild(div);
    updateResume();
}

// Remove education entry
function removeEducation(button) {
    button.closest('.education-item').remove();
    educationCount--;
    updateResume();
}

// Add experience entry
function addExperience(data = null) {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `
        <div class="item-header">
            <span class="item-title">Experience Entry #${experienceCount}</span>
            <button type="button" class="remove-btn" onclick="removeExperience(this)">×</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" placeholder="Company Name" value="${data ? data.company : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Position</label>
                <input type="text" class="exp-position" placeholder="Software Developer" value="${data ? data.position : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" class="exp-start" placeholder="Jan 2020" value="${data ? data.startDate : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="text" class="exp-end" placeholder="Dec 2022" value="${data && !data.current ? data.endDate : ''}" ${data && data.current ? 'disabled' : ''} oninput="updateResume()">
                <div class="checkbox-group">
                    <input type="checkbox" class="exp-current" ${data && data.current ? 'checked' : ''} onchange="toggleCurrentJob(this)">
                    <label>Currently working here</label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="exp-description" rows="3" placeholder="Describe your responsibilities and achievements..." oninput="updateResume()">${data ? data.description : ''}</textarea>
        </div>
    `;
    container.appendChild(div);
    updateResume();
}

// Remove experience entry
function removeExperience(button) {
    button.closest('.experience-item').remove();
    experienceCount--;
    updateResume();
}

// Add certification entry
function addCertification(data = null) {
    certificationCount++;
    const container = document.getElementById('certificationContainer');
    const div = document.createElement('div');
    div.className = 'certification-item';
    div.innerHTML = `
        <div class="item-header">
            <span class="item-title">Certification #${certificationCount}</span>
            <button type="button" class="remove-btn" onclick="removeCertification(this)">×</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Certification Name</label>
                <input type="text" class="cert-name" placeholder="AWS Certified Developer" value="${data ? data.name : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Issuing Organization</label>
                <input type="text" class="cert-issuer" placeholder="Amazon Web Services" value="${data ? data.issuer : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Date Earned</label>
                <input type="text" class="cert-date" placeholder="Jun 2023" value="${data ? data.date : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Credential URL (Optional)</label>
                <input type="url" class="cert-url" placeholder="https://www.credly.com/badges/..." value="${data ? data.url : ''}" oninput="updateResume()">
            </div>
        </div>
    `;
    container.appendChild(div);
    updateResume();
}

// Remove certification entry
function removeCertification(button) {
    button.closest('.certification-item').remove();
    certificationCount--;
    updateResume();
}

// Add achievement entry
function addAchievement(data = null) {
    achievementCount++;
    const container = document.getElementById('achievementContainer');
    const div = document.createElement('div');
    div.className = 'achievement-item';
    div.innerHTML = `
        <div class="item-header">
            <span class="item-title">Achievement #${achievementCount}</span>
            <button type="button" class="remove-btn" onclick="removeAchievement(this)">×</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Achievement Title</label>
                <input type="text" class="ach-title" placeholder="Employee of the Month" value="${data ? data.title : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="text" class="ach-date" placeholder="Mar 2023" value="${data ? data.date : ''}" oninput="updateResume()">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="ach-description" rows="2" placeholder="Describe your achievement..." oninput="updateResume()">${data ? data.description : ''}</textarea>
        </div>
    `;
    container.appendChild(div);
    updateResume();
}

// Remove achievement entry
function removeAchievement(button) {
    button.closest('.achievement-item').remove();
    achievementCount--;
    updateResume();
}

// Add project entry
function addProject(data = null) {
    projectCount++;
    const container = document.getElementById('projectContainer');
    const div = document.createElement('div');
    div.className = 'project-item';
    div.innerHTML = `
        <div class="item-header">
            <span class="item-title">Project #${projectCount}</span>
            <button type="button" class="remove-btn" onclick="removeProject(this)">×</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Project Name</label>
                <input type="text" class="proj-name" placeholder="E-commerce Website" value="${data ? data.name : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Technologies Used</label>
                <input type="text" class="proj-tech" placeholder="React, Node.js, MongoDB" value="${data ? data.technologies : ''}" oninput="updateResume()">
            </div>
            <div class="form-group">
                <label>Project URL (Optional)</label>
                <input type="url" class="proj-url" placeholder="https://github.com/username/project" value="${data ? data.url : ''}" oninput="updateResume()">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="proj-description" rows="3" placeholder="Describe the project and your contributions..." oninput="updateResume()">${data ? data.description : ''}</textarea>
        </div>
    `;
    container.appendChild(div);
    updateResume();
}

// Remove project entry
function removeProject(button) {
    button.closest('.project-item').remove();
    projectCount--;
    updateResume();
}

// Toggle current job
function toggleCurrentJob(checkbox) {
    const endDateInput = checkbox.closest('.experience-item').querySelector('.exp-end');
    if (checkbox.checked) {
        endDateInput.value = 'Present';
        endDateInput.disabled = true;
    } else {
        endDateInput.value = '';
        endDateInput.disabled = false;
    }
    updateResume();
}

// Add skill
function addSkill() {
    const input = document.getElementById('skillInput');
    const skill = input.value.trim();
    
    if (skill && !resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        addSkillTag(skill);
        input.value = '';
        updateResume();
    }
}

// Add suggested skill
function addSuggestedSkill(skill) {
    if (!resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        addSkillTag(skill);
        updateResume();
    }
}

// Add skill tag to UI
function addSkillTag(skill) {
    const container = document.getElementById('skillsContainer');
    const span = document.createElement('span');
    span.className = 'skill-tag';
    span.innerHTML = `
        ${skill}
        <button type="button" onclick="removeSkill('${skill}', this)">×</button>
    `;
    container.appendChild(span);
}

// Remove skill
function removeSkill(skill, button) {
    resumeData.skills = resumeData.skills.filter(s => s !== skill);
    button.closest('.skill-tag').remove();
    updateResume();
}

// Update progress bar
function updateProgress() {
    let filledFields = 0;
    let totalFields = 0;
    
    // Personal info (3 required fields)
    const personalFields = [
        resumeData.personalInfo.name,
        resumeData.personalInfo.email,
        resumeData.personalInfo.phone
    ];
    totalFields += 3;
    filledFields += personalFields.filter(field => field && field.trim() !== '').length;
    
    // Profile summary
    totalFields += 1;
    if (resumeData.profileSummary && resumeData.profileSummary.trim() !== '') {
        filledFields += 1;
    }
    
    // Education (at least 1 entry with institution and degree)
    totalFields += 1;
    if (resumeData.education.some(edu => edu.institution.trim() !== '' && edu.degree.trim() !== '')) {
        filledFields += 1;
    }
    
    // Skills (at least 3 skills)
    totalFields += 1;
    if (resumeData.skills.length >= 3) {
        filledFields += 1;
    }
    
    // Experience (at least 1 entry with company and position)
    totalFields += 1;
    if (resumeData.experience.some(exp => exp.company.trim() !== '' && exp.position.trim() !== '')) {
        filledFields += 1;
    }
    
    // Certifications (bonus)
    if (resumeData.certifications.length > 0) {
        filledFields += 0.5;
    }
    
    // Achievements (bonus)
    if (resumeData.achievements.length > 0) {
        filledFields += 0.5;
    }
    
    // Projects (bonus)
    if (resumeData.projects.length > 0) {
        filledFields += 0.5;
    }
    
    const progress = Math.min(Math.round((filledFields / totalFields) * 100), 100);
    
    // Update progress bar
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.querySelector('.progress-percentage').textContent = `${progress}%`;
    
    // Show completion message
    const completionMessage = document.getElementById('completionMessage');
    if (progress === 100) {
        completionMessage.classList.add('show');
    } else {
        completionMessage.classList.remove('show');
    }
}

// Clear form
function clearForm() {
    if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
        // Reset data
        resumeData = {
            personalInfo: {
                name: '',
                email: '',
                phone: '',
                address: '',
                linkedin: '',
                website: ''
            },
            profileSummary: '',
            education: [],
            skills: [],
            experience: [],
            certifications: [],
            achievements: [],
            projects: [],
            template: 'professional'
        };
        
        // Clear form
        document.getElementById('resumeForm').reset();
        document.getElementById('educationContainer').innerHTML = '';
        document.getElementById('experienceContainer').innerHTML = '';
        document.getElementById('certificationContainer').innerHTML = '';
        document.getElementById('achievementContainer').innerHTML = '';
        document.getElementById('projectContainer').innerHTML = '';
        document.getElementById('skillsContainer').innerHTML = '';
        
        // Reset counters
        educationCount = 0;
        experienceCount = 0;
        certificationCount = 0;
        achievementCount = 0;
        projectCount = 0;
        
        // Reset template
        currentTemplate = 'professional';
        document.getElementById('templateSelect').value = 'professional';
        
        // Update display
        updateResume();
        updateProgress();
        
        // Clear localStorage
        localStorage.removeItem('resumeBuilderData');
    }
}

// Change template
function changeTemplate() {
    currentTemplate = document.getElementById('templateSelect').value;
    updateResume();
}

// Show templates modal
function showTemplates() {
    document.getElementById('templatesModal').style.display = 'flex';
}

// Select template from modal
function selectTemplate(template) {
    currentTemplate = template;
    document.getElementById('templateSelect').value = template;
    closeModal('templatesModal');
    updateResume();
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Download resume
function downloadResume() {
    const resumeContent = document.getElementById('resumePreview').innerHTML;
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${resumeData.personalInfo.name || 'Resume'}</title>
                <style>
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        line-height: 1.6; 
                        margin: 0;
                        padding: 20px;
                        color: #333;
                        font-size: 14px;
                    }
                    .resume-header { 
                        border-bottom: 3px solid #3b82f6; 
                        padding-bottom: 20px; 
                        margin-bottom: 20px; 
                    }
                    .resume-name { 
                        font-size: 28px; 
                        font-weight: bold; 
                        margin-bottom: 10px; 
                        color: #1f2937;
                    }
                    .resume-contact { 
                        display: flex; 
                        flex-wrap: wrap; 
                        gap: 15px; 
                        font-size: 12px; 
                        color: #6b7280;
                    }
                    .contact-item {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    .resume-section { 
                        margin-bottom: 20px; 
                    }
                    .resume-section h2 { 
                        font-size: 16px; 
                        font-weight: bold; 
                        border-left: 4px solid #3b82f6; 
                        padding-left: 10px; 
                        margin-bottom: 12px; 
                        color: #1f2937;
                    }
                    .resume-item {
                        margin-bottom: 15px;
                    }
                    .resume-item-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 5px;
                    }
                    .resume-item-title { 
                        font-size: 14px; 
                        font-weight: bold; 
                        color: #1f2937;
                    }
                    .resume-item-subtitle { 
                        color: #3b82f6; 
                        font-weight: 600; 
                    }
                    .resume-item-date { 
                        font-size: 11px; 
                        color: #6b7280; 
                    }
                    .resume-item-description {
                        color: #374151;
                        margin-top: 5px;
                        font-size: 13px;
                    }
                    .skills-grid { 
                        display: flex; 
                        flex-wrap: wrap; 
                        gap: 6px; 
                    }
                    .skill-item { 
                        background: #f0f9ff; 
                        color: #1e40af; 
                        padding: 4px 10px; 
                        border-radius: 12px; 
                        font-size: 11px; 
                        font-weight: 500;
                    }
                    .empty-state {
                        display: none;
                    }
                    a {
                        color: #3b82f6;
                        text-decoration: none;
                    }
                    @media print {
                        body { 
                            margin: 0; 
                            padding: 15px; 
                            font-size: 12px;
                        }
                        .professional .resume-header {
                            border-bottom: 3px solid #3b82f6;
                        }
                        .professional .resume-section h2 {
                            border-left: 3px solid #3b82f6;
                        }
                        .modern .resume-header {
                            border-bottom: 2px solid #3b82f6;
                        }
                        .modern .resume-section h2 {
                            border-bottom: 2px solid #3b82f6;
                        }
                        .creative .resume-header {
                            background: #3b82f6;
                            color: white;
                        }
                        .creative .resume-name,
                        .creative .contact-item {
                            color: white;
                        }
                        .creative .resume-section h2 {
                            color: #1e40af;
                            background: #dbeafe;
                        }
                    }
                </style>
            </head>
            <body>
                ${resumeContent}
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
}


// Mobile preview functions
function showMobilePreview() {
    const modal = document.getElementById('mobileModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = document.getElementById('resumePreview').innerHTML;
    modal.style.display = 'flex';
}

function closeMobilePreview() {
    document.getElementById('mobileModal').style.display = 'none';
}