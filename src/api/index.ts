
import { Configuration, AboutApi, ArticlesApi, ProjectsApi, ExperiencesApi, SkillsApi, CoursesApi, ContactsApi, LoginApi } from "./generated";

export const apiConfig = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL,
});

export const getAuthConfig = (token: string | null) => {
    return new Configuration({
        basePath: import.meta.env.VITE_API_BASE_URL,
        accessToken: token || undefined,
    });
};

export const getAuthenticatedApis = (token: string | null) => {
    const config = getAuthConfig(token);
    return {
        aboutApi: new AboutApi(config),
        articlesApi: new ArticlesApi(config),
        projectsApi: new ProjectsApi(config),
        experiencesApi: new ExperiencesApi(config),
        skillsApi: new SkillsApi(config),
        coursesApi: new CoursesApi(config),
        contactsApi: new ContactsApi(config),
    };
};

export const loginApi = new LoginApi(apiConfig);
export const aboutApi = new AboutApi(apiConfig);
export const articlesApi = new ArticlesApi(apiConfig);
export const projectsApi = new ProjectsApi(apiConfig);
export const experiencesApi = new ExperiencesApi(apiConfig);
export const skillsApi = new SkillsApi(apiConfig);
export const coursesApi = new CoursesApi(apiConfig);
export const contactsApi = new ContactsApi(apiConfig);

