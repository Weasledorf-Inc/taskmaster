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

.PHONY: install-aws-cli
install-aws-cli:
	mkdir ~/bin/
	curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
	unzip awscliv2.zip
	./aws/install --install-dir ~/.aws-cli --bin-dir ~/bin/
	rm -rf awscliv2.zip aws
	@ echo "${GREEN}The aws cli was installed into your ~/bin directory"
	@ echo "Add ~/bin to your path${RESET}"

.PHONE: install-deps
install-deps:
	npm install --global yarn
	yarn install
	echo y | npx projen
