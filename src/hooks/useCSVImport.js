import { useAtom } from 'jotai';
import { objectsAtom, tagsAtom } from '../atoms';

export const useCSVImport = () => {
  const [, setObjects] = useAtom(objectsAtom);
  const [, setTags] = useAtom(tagsAtom);

  const importCSV = async (file) => {
    const text = await file.text();
    const rows = text.split('\n').slice(1); // Skip header row
    const objects = [];
    const tagsSet = new Set();

    rows.forEach((row) => {
      const [id, title, note, excerpt, url, tags, created, cover] = row.split(',');
      const tagList = tags && typeof tags === 'string' ? tags.split(' ') : [];
      tagList.forEach((tag) => tagsSet.add(tag));

      objects.push({
        id,
        title,
        note,
        excerpt,
        url,
        tags: tagList,
        created,
        cover,
        type: url.includes('youtube.com') ? 'video' : 'link',
      });
    });

    setObjects((prev) => [...prev, ...objects]);
    setTags((prev) => [...new Set([...prev, ...Array.from(tagsSet)])]);
  };

  return { importCSV };
};
