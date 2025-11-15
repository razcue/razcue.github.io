import { useState } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';

interface ProjectsProps {
  locale: Locale;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  license?: string;
  status?: 'deployed' | 'in-progress' | 'deprecated' | 'idea';
  pictureDesktopUrl?: string;
  pictureMobileUrl?: string;
}

export default function Projects({ locale }: ProjectsProps) {
  const t = getTranslation(locale);
  const projects: Project[] = ((t.projects && t.projects.items) ||
    []) as Project[];
  const [activeProject, setActiveProject] = useState(0);

  const handleTalkAbout = (projectTitle: string) => {
    // Encode the message and add it to the URL hash
    const message = `I want to build something like ${projectTitle}`;
    const encodedMessage = encodeURIComponent(message);
    window.location.hash = `contact?message=${encodedMessage}`;

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'deployed':
        return 'text-[var(--accent)]';
      case 'in-progress':
        return 'text-[var(--text)]';
      case 'deprecated':
        return 'text-[var(--text-secondary)]';
      case 'idea':
        return 'text-[var(--text)]/80';
      default:
        return 'text-[var(--text)]';
    }
  };

  const getStatusLabel = (
    status?: 'deployed' | 'in-progress' | 'deprecated' | 'idea'
  ) => {
    if (!status) return '';
    return t.projects.status[status] || status;
  };

  if (projects.length === 0) return null;

  const currentProject = projects[activeProject];

  return (
    <section
      id="projects"
      className="min-h-screen flex items-start lg:items-center px-2 lg:px-6 lg:px-8 py-12 lg:py-20"
    >
      <div className="w-full mx-auto">
        <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-[var(--text)] mb-4 sm:mb-8 lg:mb-12">
          {t.projects.title}
        </h2>

        {/* Navigation Dots - Always visible */}
        {projects.length > 1 && (
          <div
            className="flex justify-center gap-2 mb-6 lg:mb-8"
            role="tablist"
            aria-label="Project navigation"
          >
            {projects.map((project, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeProject === index}
                aria-label={`View ${project.title}`}
                onClick={() => setActiveProject(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${
                    activeProject === index
                      ? 'bg-[var(--accent)] w-8'
                      : 'bg-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/50'
                  }
                `}
              />
            ))}
          </div>
        )}

        {/* Project Card */}
        <article className="w-full">
          <div className="@container grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            {/* Mobile Layout - Compact vertical stack */}
            <div className="lg:hidden col-span-1 space-y-3">
              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[var(--text)] text-center">
                {currentProject.title}
              </h3>

              {/* Screenshots Container with Overlap */}
              <div className="relative w-full max-w-60 mx-auto">
                {/* Mobile Screenshot - Primary, centered */}
                <div className="relative w-11/20 z-10">
                  <div className="rounded-lg overflow-hidden border-2 border-[var(--accent)]/30 bg-[var(--surface)] shadow-xl">
                    <div className="aspect-[9/19] bg-gradient-to-br from-[var(--accent)]/15 via-[var(--surface)] to-[var(--accent)]/5 flex items-center justify-center relative">
                      {currentProject.pictureMobileUrl ? (
                        <img
                          src={currentProject.pictureMobileUrl}
                          alt={`${currentProject.title} mobile view`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 backdrop-blur-md bg-[var(--surface)]/30"
                            aria-hidden="true"
                          />
                          <div className="text-center text-[var(--text-secondary)] relative z-10">
                            <div className="text-3xl mb-1">📱</div>
                            <p className="text-[10px]">Mobile</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop Screenshot - Smaller, bottom right overlap */}
                <div className="absolute bottom-2/5 right-0 w-13/16">
                  <div className="rounded overflow-hidden border border-[var(--accent)]/20 bg-[var(--surface)] shadow-lg">
                    <div className="aspect-[16/9] bg-gradient-to-br from-[var(--accent)]/20 via-[var(--surface)] to-[var(--accent)]/10 flex items-center justify-center relative">
                      {currentProject.pictureDesktopUrl ? (
                        <img
                          src={currentProject.pictureDesktopUrl}
                          alt={`${currentProject.title} desktop view`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 backdrop-blur-md bg-[var(--surface)]/30"
                            aria-hidden="true"
                          />
                          <div className="text-center text-[var(--text-secondary)] relative">
                            <div className="text-xl">🖥️</div>
                            <p className="text-[9px]">Desktop</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status & License Chips - Left side of desktop card */}
                <div className="absolute max-w-24 text-right top-0 right-0 flex flex-col flex-wrap justify-end gap-1">
                  {currentProject.status && (
                    <span
                      className={`text-xs font-medium rounded-full ${getStatusColor(currentProject.status)}`}
                    >
                      {getStatusLabel(currentProject.status)}
                    </span>
                  )}
                  {currentProject.license && (
                    <span className="text-xs font-medium text-[var(--accent)] rounded-full">
                      {currentProject.license}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute bottom-0 right-0 flex flex-col">
                  <div className="flex gap-2 p-1 justify-end">
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label="View GitHub repository"
                        title="GitHub"
                      >
                        <div className="i-tabler-brand-github w-4 h-4" />
                      </a>
                    )}
                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        aria-label="View live site"
                        title="Live Site"
                      >
                        <div className="i-tabler-external-link w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleTalkAbout(currentProject.title)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] border border-[var(--text-secondary)]/20 hover:border-[var(--accent)] rounded-md transition-colors"
                    aria-label={`Talk about ${currentProject.title}`}
                  >
                    <div className="i-tabler-message-dots w-3.5 h-3.5" />
                    {t.projects.talkAbout}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[var(--surface)] rounded-lg p-2.5 sm:p-3 shadow-lg border border-[var(--accent)]/10">
                <p className="text-[var(--text-secondary)] text-[11px] sm:text-xs leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 justify-center">
                {currentProject.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-[10px] font-mono text-[var(--accent)]"
                  >
                    {techIndex > 0 && <span className="mr-1">-</span>}
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop Layout - Side by side */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:col-span-12">
              {/* Desktop Screenshot - Left side, primary */}
              <div className="col-span-7 relative">
                <div className="mb-3 flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl lg:text-2xl font-bold text-[var(--text)]">
                    {currentProject.title}
                  </h3>
                  {currentProject.status && (
                    <span
                      className={`py-1 text-xs font-medium ${getStatusColor(currentProject.status)}`}
                    >
                      {getStatusLabel(currentProject.status)}
                    </span>
                  )}
                  {currentProject.license && (
                    <span className="text-xs font-medium text-[var(--accent)]">
                      {currentProject.license}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <div className="rounded-lg overflow-hidden border border-[var(--accent)]/20 bg-[var(--surface)] shadow-lg">
                    <div className="aspect-[16/9] bg-gradient-to-br from-[var(--accent)]/20 via-[var(--surface)] to-[var(--accent)]/10 flex items-center justify-center relative">
                      {currentProject.pictureDesktopUrl ? (
                        <img
                          src={currentProject.pictureDesktopUrl}
                          alt={`${currentProject.title} desktop view`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 backdrop-blur-md bg-[var(--surface)]/30"
                            aria-hidden="true"
                          />
                          <div className="text-center text-[var(--text-secondary)] relative z-10">
                            <div className="text-4xl mb-2">🖥️</div>
                            <p className="text-sm">Desktop</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mobile Screenshot - Floating overlay */}
                  <div className="absolute -top-2 -right-4 w-[18cqw]">
                    <div className="rounded-lg overflow-hidden border-2 border-[var(--accent)]/30 bg-[var(--surface)] shadow-xl">
                      <div className="aspect-[9/19] bg-gradient-to-br from-[var(--accent)]/15 via-[var(--surface)] to-[var(--accent)]/5 flex items-center justify-center relative">
                        {currentProject.pictureMobileUrl ? (
                          <img
                            src={currentProject.pictureMobileUrl}
                            alt={`${currentProject.title} mobile view`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <>
                            <div
                              className="absolute inset-0 backdrop-blur-md bg-[var(--surface)]/30"
                              aria-hidden="true"
                            />
                            <div className="text-center text-[var(--text-secondary)] relative z-10">
                              <div className="text-5xl mb-2">📱</div>
                              <p className="text-sm">Mobile</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info - Right side */}
              <div className="col-span-5">
                <div className="flex gap-1 mb-4">
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                      aria-label="View GitHub repository"
                      title="GitHub"
                    >
                      <div className="i-tabler-brand-github w-6 h-6" />
                    </a>
                  )}
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                      aria-label="View live site"
                      title="Live Site"
                    >
                      <div className="i-tabler-external-link w-6 h-6" />
                    </a>
                  )}
                  <button
                    onClick={() => handleTalkAbout(currentProject.title)}
                    className="flex items-center gap-2 ml-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] border border-[var(--text-secondary)] hover:border-[var(--accent)] rounded-md transition-colors"
                    aria-label={`Talk about ${currentProject.title}`}
                  >
                    <div className="i-tabler-message-dots w-4 h-4" />
                    {t.projects.talkAbout}
                  </button>
                </div>

                <div className="bg-[var(--surface)] rounded-lg p-5 shadow-lg border border-[var(--accent)]/10 mb-4">
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 justify-end pl-4">
                  {currentProject.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-sm font-mono text-[var(--accent)]"
                    >
                      {techIndex > 0 && <span className="mr-1">-</span>}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
