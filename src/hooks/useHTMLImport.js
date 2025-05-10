import { useAtom } from 'jotai';
import { objectsAtom, tagsAtom, currentUniverseAtom } from '../atoms';

export const useHTMLImport = () => {
  const [, setObjects] = useAtom(objectsAtom);
  const [, setTags] = useAtom(tagsAtom);
  const [currentUniverse] = useAtom(currentUniverseAtom);

  const importHTML = async (file) => {
    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = doc.getElementsByTagName('A');
    
    const objects = Array.from(links).map(link => {
      const tags = link.getAttribute('TAGS')?.split(',').filter(Boolean) || [];
      return {
        id: crypto.randomUUID(),
        title: link.textContent,
        url: link.getAttribute('HREF'),
        cover: link.getAttribute('DATA-COVER'),
        tags,
        type: link.getAttribute('HREF')?.includes('youtube.com') || 
              link.getAttribute('HREF')?.includes('youtu.be') ? 'video' : 'link',
        addDate: link.getAttribute('ADD_DATE'),
        lastModified: link.getAttribute('LAST_MODIFIED'),
        important: link.getAttribute('DATA-IMPORTANT') === 'true',
        universeId: currentUniverse || null // Assign current universe
      };
    });

    const allTags = Array.from(new Set(
      objects.flatMap(obj => obj.tags)
    )).filter(Boolean);

    setObjects(prev => [...prev, ...objects]);
    setTags(prev => [...new Set([...prev, ...allTags])]);
  };

  return { importHTML };
};
