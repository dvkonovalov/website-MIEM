terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }

  required_version = ">= 0.13"
}

resource "yandex_iam_service_account" "service_accounts" {
  for_each   = {
    for index, sa in var.service_accounts: sa.name => sa
  }

  name        = each.value.name
  description = each.value.description
  folder_id   = var.folder_id
  lifecycle {
    prevent_destroy = true
  }
}

resource "yandex_resourcemanager_folder_iam_member" "service_accounts_role" {
  for_each   = {
    for index, sa in var.service_accounts: sa.name => sa
  }
  folder_id   = var.folder_id
  role        = each.value.role
  member      = "serviceAccount:${yandex_iam_service_account.service_accounts[each.key].id}"
  lifecycle {
    prevent_destroy = true
  }
}

resource "yandex_iam_service_account_static_access_key" "service_accounts_static_key" {
  for_each   = {
    for index, sa in var.service_accounts: sa.name => sa if sa.create_static_key
  }
  service_account_id = yandex_iam_service_account.service_accounts[each.key].id
  description = "Access keys are used for the authentication by Yandex Object Storage API to provide compatibility with Amazon S3 API."
  lifecycle {
    prevent_destroy = true
  }
}
