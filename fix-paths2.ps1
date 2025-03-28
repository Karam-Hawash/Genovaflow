# Script to fix paths in blog files
$htmlFiles = Get-ChildItem -Path ".\blog\all-posts" -Filter "*.html" -Recurse -File
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    # Fix navigation links
    $content = $content -replace 'href="/blog.html"', 'href="../../blog.html"'
    $content = $content -replace 'href="/all-posts.html"', 'href="../../all-posts.html"'
    $content = $content -replace 'href="/contact-us.html"', 'href="../../contact-us.html"'
    $content = $content -replace 'href="/all-posts/', 'href="../../all-posts/'
    # Fix image paths
    $content = $content -replace 'src="/all-posts/', 'src="../../all-posts/'
    $content = $content -replace 'src="/static/', 'src="../../static/'
    # Fix category links
