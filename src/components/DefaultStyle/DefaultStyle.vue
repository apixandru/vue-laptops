<template>
  <div class="content-wrap">
    <aside>
      <div class="filter-container">
        <dropdown
            title="CPU Brand"
            text="CPU Brand"
            :items="cpuBrand"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
        <dropdown
            title="CPU Family"
            text="CPU Family"
            :searchable="true"
            :items="cpuFamily"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
        <dropdown
            title="CPU Model"
            text="CPU Model"
            :searchable="true"
            :items="cpuModel"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
        <dropdown
            title="GPU Brand"
            text="GPU Brand"
            :items="gpuBrand"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
        <dropdown
            title="GPU Family"
            text="GPU Family"
            :items="gpuFamily"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
        <dropdown
            title="GPU Model"
            text="GPU Model"
            :items="gpuModel"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
        <dropdown
            title="Memory"
            text="Memory"
            :items="ram"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
        <dropdown
            title="Storage"
            text="Storage"
            :items="storage"
            @filter-init="filterWasInitialized"
            @filter-value-changed="filterValueChanged">
        </dropdown>
      </div>
    </aside>
    <section>
      <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
    </section>
    <vue-msg :timeout="2000" :top="100" :right="20" ref="vueMsg"></vue-msg>
  </div>
</template>

<script lang="ts" src="./DefaultStyle.ts"/>
<style lang="scss" scoped src="./DefaultStyle.scss"/>
