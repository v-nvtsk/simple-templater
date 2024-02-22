export function template(tpl: string, data: object): string {
  let str: string = tpl;

  const patternMatches = [...tpl.matchAll(/\{\{(\w+)\}\}/g)];
  const loopMatches = [
    ...tpl.matchAll(/\{\{for (\w+)\}\}(\s|\S+)\{\{endfor\}\}/g),
  ];

  loopMatches.forEach((match) => {
    const key = match[1];
    const subTpl = match[2];
    const newContent = (data[key] ?? [])
      .map((el) => {
        return template(subTpl, el);
      })
      .join("");
    str = str.replaceAll(match[0], newContent);
  });

  console.log({ loopMatches });

  patternMatches.forEach((match) => {
    const key = match[1];
    str = str.replaceAll(match[0], data[key] ?? "");
  });

  return str;
}
