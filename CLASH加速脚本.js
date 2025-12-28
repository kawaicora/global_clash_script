// Define main function (script entry)
function main(config, profileName) {
    let not_rule_field = false
    let global_append_select_node_name = '🔰 脚本附加规则选择节点';
    // 检查是否存在 proxy-groups 字段，如果不存在则添加
    if (!config['proxy-groups']) {
        config['proxy-groups'] = [];
    }
    const hasSelectNode = config['proxy-groups'].some(group => group.name === global_append_select_node_name);
    let proxie_names = []
    if(!config.proxies){
        config.proxies = [] //没节点玩个毛线,这只是防止脚本出错
    }
    config.proxies.forEach(element => {
        proxie_names.push(element.name)
    });
    let proxy_group =  {
                        name: global_append_select_node_name,
                        type: 'select',
                        proxies: proxie_names
                    }
    if(!hasSelectNode){
        config['proxy-groups'] = [proxy_group,...config['proxy-groups']]; 
    }
    // 检查 config 对象中是否存在 rules 属性，如果不存在则创建一个空数组
    if (!config.rules) {
        config.rules = [];
        not_rule_field = true;
    }

    // 定义要添加的规则数组
    let rules = [
        // `PROCESS-NAME,vrchat.exe, ${global_append_select_node_name}`,
        `PROCESS-NAME,git.exe,${global_append_select_node_name}`,
        `PROCESS-NAME,FlightSimulator2024.exe, ${global_append_select_node_name}`,
        `IP-CIDR,216.120.180.0/24,${global_append_select_node_name}`, // VRChat 游戏服务器 进行范围匹配
        `DOMAIN,files.vrchat.cloud,${global_append_select_node_name}`, // VRChat 文件服务器
        `DOMAIN,file-variants.vrchat.cloud,${global_append_select_node_name}`, // VRChat 文件服务器
        `DOMAIN,*.exitgames.com,${global_append_select_node_name}`, // VRChat 主服务器 
        `DOMAIN,ns.photonengine.io,${global_append_select_node_name}`, // VRChat DNS服务器
        // `DOMAIN,*.microsoft.com,${global_append_select_node_name}`, // 微软
    ];
    
    // 将新规则添加到 config 的 rules 数组的最前面
    config.rules = [...rules, ...config.rules];
    if(not_rule_field){
        config.rules.concat("MATCH,DIRECT")
    }

    return config;
}