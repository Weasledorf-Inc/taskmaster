RESET=`tput sgr0`
RED=`tput setaf 1`
GREEN=`tput setaf 2`

# Tested with ubuntu20.04
.PHONY: setup
setup:
	@ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
	@ echo ""
	@ echo "${GREEN}Run '~/.bashrc' to pick up nvm changes"
	@ echo "Run 'nvm install 16.7.0'${RESET}"

.PHONE: install-deps
install-deps:
	npm install --global yarn
	yarn install
	echo y | npx projen
