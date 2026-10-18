const zod = require("zod");


const courseSchema = zod.object({
    name: zod.string().min(3).max(60),

    description: zod.string().min(10),

    category: zod.enum([
        "Web Development",
        "Designing",
        "Mobile App Development",
        "Data Structures and Algorithms",
        "Data Analytics",
        "Data Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Cloud Computing",
        "Cybersecurity",
        "Blockchain",
        "Internet of Things",
        "Game Development",
        "DevOps",
        "Software Testing",
        "Database Management",
        "Networking",
        "Programming Languages",
        "IT & Software",
        "Digital Marketing",
        "Project Management",
        "Business",
        "Finance",
        "Personal Development",
        "Health & Fitness",
        "Programming Language",
        "Software Development"
    ]),

    youtubePlaylistId: zod.string().min(1),

    skills: zod.string().min(1),

    language: zod.enum([
        "English",
        "Hindi",
        "Hinglish"
    ]),

    prerequisite: zod.string().optional()
});


module.exports = {
    courseSchema
};
