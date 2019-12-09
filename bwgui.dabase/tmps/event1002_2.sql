update bwgui_processor.objects_events set query ='
select json_build_object(
''clear'', 1,
''objId_parent'',''prop'',
''objId'',''propview'',
''view'', (select to_json(body) from bwgui_processor.html h where h.html = 1003),
''css'', (select to_json(body) from bwgui_processor.style s where s.style = 1),
''data'', (select json_agg(to_json(bwgui_processor.gettablerowtransp(''bwgui_processor.html'',''html=''||((($1)::json)#>>''{"html"}'')))))
)
' where object=1002 and event=2;
