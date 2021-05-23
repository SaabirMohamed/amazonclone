[[ -z "$1" ]] && { echo "Error:please provide a message in quotes [./vercelpublish 'updated homepage css']"; exit 1; }
TIMESTAMP=`date +%Y-%m-%d_%H-%M-%S-$1`
echo uploading... ---> git-repo ---> vercel
git add . && git commit -m TIMESTAMP && git push
echo done

