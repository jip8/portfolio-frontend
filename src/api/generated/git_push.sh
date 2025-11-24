git_user_id=$1
git_repo_id=$2
release_note=$3
git_host=$4

if [ "$git_host" = "" ]; then
    git_host="github.com"
    echo "[INFO] No command line input provided. Set \$git_host to $git_host"
fi

if [ "$git_user_id" = "" ]; then
    git_user_id="GIT_USER_ID"
    echo "[INFO] No command line input provided. Set \$git_user_id to $git_user_id"
fi

if [ "$git_repo_id" = "" ]; then
    git_repo_id="GIT_REPO_ID"
    echo "[INFO] No command line input provided. Set \$git_repo_id to $git_repo_id"
fi

if [ "$release_note" = "" ]; then
    release_note="Minor update"
    echo "[INFO] No command line input provided. Set \$release_note to $release_note"
fi

git init

git add .

git commit -m "$release_note"

git_remote=$(git remote)
if [ "$git_remote" = "" ]; then

    if [ "$GIT_TOKEN" = "" ]; then
        echo "[INFO] \$GIT_TOKEN (environment variable) is not set. Using the git credential in your environment."
        git remote add origin https://${git_host}/${git_user_id}/${git_repo_id}.git
    else
        git remote add origin https://${git_user_id}:"${GIT_TOKEN}"@${git_host}/${git_user_id}/${git_repo_id}.git
    fi

fi

git pull origin master

echo "Git pushing to https://${git_host}/${git_user_id}/${git_repo_id}.git"
git push origin master 2>&1 | grep -v 'To https'
