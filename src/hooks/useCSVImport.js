import { useAtom } from 'jotai';
import { objectsAtom, tagsAtom, currentUniverseAtom } from '../atoms';

export const useCSVImport = () => {
  const [, setObjects] = useAtom(objectsAtom);
  const [, setTags] = useAtom(tagsAtom);
  const [currentUniverse] = useAtom(currentUniverseAtom);

  const importCSV = async (file) => {
    const text = await file.text();
    const rows = text.split('\n').slice(1); // Skip header row
    const objects = [];
    const tagsSet = new Set();

    rows.forEach((row) => {
      if (!row.trim()) return; // Skip empty rows
      const [_id, title, note, excerpt, url, tags, created, cover] = row.split(',').map(val => val?.trim() || '');
      const tagList = tags ? tags.split(' ').filter(tag => tag) : [];
      tagList.forEach((tag) => tag && tagsSet.add(tag));

      objects.push({
        id: crypto.randomUUID(),
        title,
        note,
        excerpt,
        url,
        tags: tagList,
        created,
        cover,
        type: url && url.includes('youtube.com') ? 'video' : 'link',
        universeId: currentUniverse || null // Assign current universe
      });
    });

    setObjects((prev) => [...prev, ...objects]);
    setTags((prev) => [...new Set([...prev, ...Array.from(tagsSet)])]);
  };

  return { importCSV };
};
