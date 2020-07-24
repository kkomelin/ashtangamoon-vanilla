@servers(['magnanimous' => '-A -p 20202 -l komelin 165.22.206.2'])

@setup
    $dir_live = '/srv/sites/moon.komelin.com';
    $date = date('Y-m-d H:i:s');
@endsetup

@task('deploy', ['on' => 'magnanimous'])
    echo "Deployment on Live started at {{ $date }}".
    cd {{ $dir_live }}
    git pull origin master
    echo "Deployment finished on Live."
@endtask
