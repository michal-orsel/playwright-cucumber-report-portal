import { Project, PlaywrightTestOptions, PlaywrightWorkerOptions } from "@playwright/test";
import config from "../../../config/config.json";
import playwright_config from "../../../playwright.config";

let finalConfig: any | undefined;

export const getPlaywrightConfig = async function getTestConfig() {
    if(finalConfig) {
        return finalConfig;
    }

    let projectName = process.env.PROJECT || config.project;
    let project = await getProjectFromPlaywrightConfig(projectName);
    finalConfig = await doStupidInheritance(project);
    return finalConfig;
}

async function getProjectFromPlaywrightConfig(projectName: string) {
    if (!playwright_config.projects) {
        throw new Error("Projects are missing in playwright.config.ts");
    }
    let project = playwright_config.projects.find(a => a.name == projectName);
    if (!project) {
        throw new Error(`Projects with name ${projectName} is missing in playwright.config.ts`);
    }
    return project;
}

async function doStupidInheritance(project: Project<PlaywrightTestOptions & {}, PlaywrightWorkerOptions & {}>) {
    let theConfig = { ...playwright_config };
    theConfig.use = {
        ...playwright_config?.use,
        ...playwright_config?.use?.launchOptions,
        ...project?.use,
        ...project?.use?.launchOptions
    };
    theConfig.use.launchOptions = {
        ...theConfig.use,
    };
    return theConfig;
}
