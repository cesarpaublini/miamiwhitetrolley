/**
 * Wix → Markdown Bookmarklet
 *
 * HOW TO INSTALL:
 *   1. In Chrome, press Cmd+Shift+B to show the bookmarks bar
 *   2. Right-click the bar → "Add page"
 *   3. Name: "Copy as Markdown"
 *   4. URL: paste the ENTIRE minified line below (starts with "javascript:")
 *
 * HOW TO USE:
 *   1. Open a Wix blog post (e.g. miamiwhitetrolley.com/post/...)
 *   2. Click the "Copy as Markdown" bookmark
 *   3. A popup confirms the markdown is in your clipboard
 *   4. Paste into the .mdoc file, replacing the TODO block
 *
 * ─── BOOKMARKLET (copy this entire line) ────────────────────────────────────
 *
javascript:(function(){function toMd(el){var out='';function walk(n){if(n.nodeType===3){out+=n.textContent;return;}var t=(n.tagName||'').toLowerCase();if(t==='script'||t==='style'||t==='noscript')return;if(/^h[1-6]$/.test(t)){out+='\n\n'+'#'.repeat(+t[1])+' ';n.childNodes.forEach(walk);out+='\n\n';}else if(t==='p'){out+='\n\n';n.childNodes.forEach(walk);out+='\n\n';}else if(t==='strong'||t==='b'){out+='**';n.childNodes.forEach(walk);out+='**';}else if(t==='em'||t==='i'){out+='_';n.childNodes.forEach(walk);out+='_';}else if(t==='a'){var href=n.getAttribute('href')||'';out+='[';n.childNodes.forEach(walk);out+=']('+href+')';}else if(t==='ul'){out+='\n\n';n.childNodes.forEach(function(li){if(li.nodeType===1&&li.tagName.toLowerCase()==='li'){out+='- ';li.childNodes.forEach(walk);out+='\n';}});out+='\n\n';}else if(t==='ol'){var i=1;out+='\n\n';n.childNodes.forEach(function(li){if(li.nodeType===1&&li.tagName.toLowerCase()==='li'){out+=i+'. ';li.childNodes.forEach(walk);out+='\n';i++;}});out+='\n\n';}else if(t==='li'){n.childNodes.forEach(walk);}else if(t==='blockquote'){out+='\n\n';n.childNodes.forEach(function(c){var tmp='';var saved=out;out='';walk(c);var lines=out.split('\n');out=saved+lines.map(function(l){return'> '+l;}).join('\n')+'\n\n';});}else if(t==='img'){var src=n.getAttribute('src')||'';var alt=n.getAttribute('alt')||'image';if(src&&!src.includes('data:'))out+='\n\n!['+alt+']('+src+')\n\n';}else if(t==='br'){out+='\n';}else if(t==='hr'){out+='\n\n---\n\n';}else{n.childNodes.forEach(walk);}}walk(el);return out.replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();}var sel=['article','[data-hook="post-content"]','[class*="post-content"]','[class*="blog-post"]','main article','main [class*="content"]','main'];var el=null;for(var i=0;i<sel.length;i++){el=document.querySelector(sel[i]);if(el)break;}if(!el){alert('Could not find article content on this page.\nTry selecting the text manually and running the bookmarklet again.');return;}var md=toMd(el);if(!md||md.length<50){alert('Content seems empty. The page may still be loading — try again in a moment.');return;}navigator.clipboard.writeText(md).then(function(){alert('Copied '+md.length+' characters as Markdown!\n\nPaste into your .mdoc file now.');}).catch(function(){var ta=document.createElement('textarea');ta.value=md;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);alert('Copied '+md.length+' characters as Markdown!');});})();
 *
 * ────────────────────────────────────────────────────────────────────────────
 */
