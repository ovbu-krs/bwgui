update bwgui_processor.objects_events set query ='
select json_build_object(
''objId_parent'',''tree'',
''objId'',''treeview'', 
''view'', (select to_json(body) from bwgui_processor.html h where h.html = 1002),
''css'', (select to_json(body) from bwgui_processor.style s where s.style = 1),
''data'', json_agg(a)
)
from (
	select json_object(
				ARRAY[''html'', ''description''], 
				ARRAY[CAST(t.html as char(100)), COALESCE(CAST(t.description as char(100)), CAST(t.html as char(100)))]) a
	from bwgui_processor.html t
	order by t.html asc
      ) as tab
' where object=1002 and event=1;
