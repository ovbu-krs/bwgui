printf -v date '%(%Y%m%d)T' -1
pg_dump -Fc pi > $date'_bwgui.backup'
