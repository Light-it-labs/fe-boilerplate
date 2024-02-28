provider "aws" {
  region = var.region
  shared_config_files      = ["~/.aws/config"]
  shared_credentials_files = ["~/.aws/credentials"]
  profile                  = var.profile
  default_tags {
    tags = {
      Project = var.project_name
      Environment = terraform.workspace
    }
  }
}
