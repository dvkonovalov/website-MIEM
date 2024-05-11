"""Script for testing Seamless Deployment of Rane."""
import json
import logging
import math
import time
from collections import Counter, defaultdict
from datetime import datetime

import requests

logging.basicConfig(level=logging.INFO, format='{message}', style='{')

AGGREGATOR = 60
REQUSET_TIMEOUT_SECONDS = 2

status_codes: defaultdict[str, Counter[str]] = defaultdict(Counter)
versions: defaultdict[str, Counter[str]] = defaultdict(Counter)


def _aggregate_time(unix_time: float, aggregator: int = AGGREGATOR) -> int:
    unix_time = math.floor(unix_time)
    return unix_time - unix_time % aggregator


def _test_deployment():
    while True:
        aggregated_time: int = _aggregate_time(time.time())
        pretty_time: str = (
            datetime.fromtimestamp(aggregated_time).strftime('%H:%M:%S')
        )
        try:
            responce = requests.get(
                'http://130.193.48.90/version',
                timeout=REQUSET_TIMEOUT_SECONDS,
            )
        except requests.ConnectionError:
            status_codes[pretty_time]['503'] += 1
            versions[pretty_time]['Service unavailable'] += 1
            continue

        status_codes[pretty_time][str(responce.status_code)] += 1
        versions[pretty_time][responce.json()['version']] += 1


def main():
    """Test seamless deployment of Rane."""
    try:
        _test_deployment()
    except KeyboardInterrupt:
        for _, counter in status_codes.items():
            counter['ratio (%)'] = (
                math.floor(
                    sum(
                        [
                            count
                            for code, count in counter.items()
                            if code.startswith('2')
                        ],
                    ) * 100 / counter.total(),
                )
            )
        logging.info(
            'Status codes:\n{status_codes}'.format(
                status_codes=json.dumps(
                    status_codes,
                    indent=4,
                    sort_keys=True,
                ),
            ),
        )
        logging.info(
            'Versions:\n{versions}'.format(
                versions=json.dumps(
                    versions,
                    indent=4,
                    sort_keys=True,
                ),
            ),
        )


if __name__ == '__main__':
    main()
