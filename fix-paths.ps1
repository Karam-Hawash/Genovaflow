# Script to fix absolute paths in blog post files
$htmlFiles = Get-ChildItem -Path ".\blog\all-posts" -Filter "*.html" -Recurse -File
Write-Host 'Found ' + .Count + ' HTML files to process'
foreach ($file in $htmlFiles) {
    Write-Host 'Processing ' + $file.FullName
    $content = Get-Content -Path $file.FullName -Raw
    # Fix links in navigation
    $content = $content -replace "href=\"/all-posts.html\"", "href=\"../../all-posts.html\""
    $content = $content -replace "href=\"/blog.html\"", "href=\"../../blog.html\""
    $content = $content -replace "href=\"/contact-us.html\"", "href=\"../../contact-us.html\""
    # Fix links to blog post files
    $content = $content -replace "href=\"/all-posts/", "href=\"../../all-posts/"
    # Fix image paths
    $content = $content -replace "src=\"/all-posts/", "src=\"../../all-posts/"
    $content = $content -replace "src=\"/static/", "src=\"../../static/"
    # Fix links to categories
    $content = $content -replace "href=\"/all-posts.html\?category=", "href=\"../../all-posts.html?category="
    # Save the updated content back to the file
    Set-Content -Path $file.FullName -Value $content
    Write-Host ('Fixed paths in ' + $file.Name)
}
Write-Host 'Path replacement completed for all blog post files.'
