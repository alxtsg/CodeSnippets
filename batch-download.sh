#!/bin/sh
#
# Batch download files from given URLs specified in a text file. For use on
# OpenBSD.
# Author: Alex Tsang <alextsang@live.com>
# License: The 3-Clause BSD License

set -e
set -u
IFS='\n\t'

listFile=

usage()
{
  echo "Usage: sh ${0} /path/to/file"
}

if [ "${#}" -ne 1 ]; then
  usage
  exit 1
fi

if [ ! -f "${1}" ]; then
  echo "${1} is not a file."
  exit 1
fi
listFile="${1}"

while read -r line; do
  if [ -z "${line}" ]; then
    continue
  fi

  ftp "${line}"
done < "${listFile}"
