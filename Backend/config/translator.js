// Translate a single string using fetch
export async function translateText(text, targetLang) {
  try {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: "Amazing Project",
        source: "auto",
        target: "ru",
        format: "text",
      }),
    });

    const data = await response.json();

    console.log(data);

    // ensure fallback to original text
    if (!data || !data.translatedText) {
      console.warn("Translation API returned no text, returning original");
      return text;
    }

    return data.translatedText;
  } catch (err) {
    console.error("Translation error:", err.message);
    return text; // fallback
  }
}

// Translate project object recursively (all string fields)
export async function translateProject(project, targetLang) {
  if (!targetLang || targetLang === "en") return project;

  const translatedProject = { ...project };

  // Translate main fields
  translatedProject.title = project.title
    ? await translateText(project.title, targetLang)
    : project.title;
  translatedProject.headline = project.headline
    ? await translateText(project.headline, targetLang)
    : project.headline;
  translatedProject.content = project.content
    ? await translateText(project.content, targetLang)
    : project.content;

  // Helper to translate sections while preserving other fields
  const translateSection = async (sections) => {
    if (!sections || !sections.length) return [];
    return await Promise.all(
      sections.map(async (s) => ({
        ...s, // keep all original fields
        title: s.title ? await translateText(s.title, targetLang) : s.title,
        description: s.description
          ? await translateText(s.description, targetLang)
          : s.description,
      }))
    );
  };

  translatedProject.photoDescSections = await translateSection(
    project.photoDescSections
  );
  translatedProject.videoDescSections = await translateSection(
    project.videoDescSections
  );
  translatedProject.photoGallerySections = await translateSection(
    project.photoGallerySections
  );
  translatedProject.videoGallerySections = await translateSection(
    project.videoGallerySections
  );

  return translatedProject;
}
