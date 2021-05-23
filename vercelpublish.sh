[[ -z "$1" ]] && { echo "Error:please provide a message in quotes [./vercelpublish 'updated homepage css']"; exit 1; }
echo uploading... ---> git-repo ---> vercel
TIMESTAMP=$(date +%d-%m-%Y_%H-%M-%S)
echo $TIMESTAMP
git add . && git commit -m $TIMESTAMP && git push
echo done

