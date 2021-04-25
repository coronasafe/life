import React from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faLink, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Badge from './Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isVerified, parseDateString } from '@lib/utils';
import SocialSharing from '@components/AmbulanceCard';
import { useRouter } from 'next/router';

const OxygenCard = ({
    name,
    company,
    phone1,
    phone2,
    description,
    source,
    slink,
    fstate,
    fdistrict,
    createdTime,
    verificationStatus,
    lastVerifiedOn
}) => {
    const { asPath } = useRouter();
    const pageUrl = `https://liferesources.in${asPath}`;
    const copyText = `Name: ${name ? name : 'Oxygen'} \nContact: ${phone1} `;
    return (
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-1200 dark:text-gray-300">
            <div className="w-full flex items-center pt-2">
                <div className="ml-auto">
                    <SocialSharing
                        url={pageUrl}
                        twitterText={`${copyText} More Info: ${pageUrl}`}
                        copyText={copyText}
                    />
                </div>
            </div>
            <div className="p-4 flex justify-between flex-wrap">
                <div>
                    <div className="font-bold text-2xl dark:text-white">
                        <h1>{name}</h1>
                        <div className="flex items-center text-sm uppercase mt-3 text-gray-700 dark:text-gray-400 font-semibold">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 mr-2" />
                            <span className="mr-2">{fdistrict}</span>|
                            <span className="ml-2">{fstate}</span>
                        </div>
                        <div className="w-11/12 mt-2">
                            <div className="text-sm">{source}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    {phone1 && (
                        <a
                            className="flex items-center text-gray-800 hover:text-gray-900 text-lg font-bold dark:text-white mt-2"
                            href={`tel:${phone1}`}>
                            <FontAwesomeIcon
                                title={`${phone1}`}
                                className="w-4"
                                icon={faPhoneAlt}
                            />
                            <span className="ml-2">{phone1}</span>
                        </a>
                    )}
                    {slink && (
                        <a
                            className="flex items-center text-gray-700 font-bold text-xl hover:text-gray-900 dark:text-white"
                            target="_blank"
                            href={slink}>
                            <FontAwesomeIcon title={`${slink}`} className="w-4" icon={faLink} />
                            <span className="ml-2 text-lg mt-1">Source Link</span>
                        </a>
                    )}
                    <span>
                        <Badge badgeType={verificationStatus || 'unverified'} />
                    </span>
                </div>
            </div>
            <hr className="dark:border-gray-900" />
            <div className="flex justify-between items-center mx-4 mt-2 pb-3 flex-wrap">
                <div className="font-semibold dark:text-gray-400">{description}</div>
                <div className="text-gray-700 text-sm dark:text-gray-400">
                    {lastVerifiedOn && (
                        <div className="text-gray-700 text-xs dark:text-white">
                            <div>
                                <span>
                                    {isVerified(verificationStatus)
                                        ? 'Verified on: '
                                        : 'Checked on: '}
                                </span>
                                <span className="font-bold">{parseDateString(lastVerifiedOn)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OxygenCard;
