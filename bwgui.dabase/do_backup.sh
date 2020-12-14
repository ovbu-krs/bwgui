printf -v date '%(%Y%m%d)T' -1
pg_dump -Fc root > $date'_bwgui.backup'
