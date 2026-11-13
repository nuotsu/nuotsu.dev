#!/bin/zsh
# Grabs the refresh token from the dedicated `CLAUDE_CONFIG_DIR=~/.claude-site` login,
# puts it in .env.local + the clipboard, then deletes that local login so it never
# refreshes (and invalidates) the token the site is using.
set -euo pipefail
cd "${0:A:h}/.."

entries=(${(f)"$(security dump-keychain | grep -o '"Claude Code-credentials-[^"]*"' | tr -d '"' | sort -u)"})
if (( ${#entries} != 1 )); then
	echo "Expected exactly one 'Claude Code-credentials-…' keychain entry, found ${#entries}:" >&2
	printf '  %s\n' $entries >&2
	echo "Did you run step 2 (the /login)?" >&2
	exit 1
fi

token=$(security find-generic-password -s "$entries[1]" -w |
	python3 -c 'import json,sys;print(json.load(sys.stdin)["claudeAiOauth"]["refreshToken"])')

# .env.local: drop the old access token, replace/add the refresh token
touch .env.local
grep -v -e '^CLAUDE_OAUTH_TOKEN=' -e '^CLAUDE_REFRESH_TOKEN=' .env.local > .env.local.tmp || true
echo "CLAUDE_REFRESH_TOKEN=\"$token\"" >> .env.local.tmp
mv .env.local.tmp .env.local

print -n "$token" | pbcopy

security delete-generic-password -s "$entries[1]" > /dev/null
rm -rf ~/.claude-site

echo "✓ Saved CLAUDE_REFRESH_TOKEN to .env.local"
echo "✓ Copied it to your clipboard (paste it into Vercel next)"
echo "✓ Deleted the temporary login"
