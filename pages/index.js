import Link from 'next/link';
import { useState } from 'react';
import { getStates } from '@lib/api';
import { humanize, parametreize } from '@lib/utils';
import Tabs from '@components/Tabs';
import Logo from '@components/Logo';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Selector from '@components/Selector';
import { tabsInfo } from '@lib/tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

let updateFilter = (setSelectedFilter, selection) => setSelectedFilter(selection);

export default function Home() {
    const [selectedFilter, setSelectedFilter] = useState('oxygen');

    return (
        <div>
            <section className="flex flex-col items-center md:pt-20">
                <Logo width={100} />
                <h1 className="mt-1 font-black text-6xl text-gray-900 dark:text-gray-100">LIFE</h1>
                <h2 className="mt-4 font-semibold text-xl text-gray-900 dark:text-gray-100 text-center">
                    Verified Crowd Sourced Emergency Services Directory
                </h2>
                <div className="mt-4 ">
                    <Tabs
                        tabsInfo={tabsInfo}
                        selectedFilter={selectedFilter}
                        updateFilterCB={(e) => updateFilter(setSelectedFilter, e)}
                    />
                </div>
                <div className="w-full md:w-3/4 px-2">
                    <Selector page={selectedFilter} />
                </div>
                <div className="flex flex-wrap items-center justify-evenly mt-6 ">
                    {getStates(selectedFilter).map((s) => {
                        return (
                            <Link key={s} href={`[state]`} as={`${parametreize(s)}`}>
                                <span className="p-2 text-sm md:text-md font-normal hover:font-bold cursor-pointer hover:text-gray-900 text-gray-500 dark:hover:text-gray-50">
                                    {humanize(s)}
                                </span>
                            </Link>
                        );
                    })}
                </div>
                <a href="https://www.covid19india.org/">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md dark:text-white text-black dark:bg-gray-1000 bg-white hover:opacity-60 focus:outline-none mt-6">
                        <FontAwesomeIcon
                            className="text-white-400 w-4 mr-4"
                            title="Covid 19 Statistics"
                            icon={faChartBar}
                        />
                        Covid19 Statistics
                    </button>
                </a>
            </section>
        </div>
    );
}
